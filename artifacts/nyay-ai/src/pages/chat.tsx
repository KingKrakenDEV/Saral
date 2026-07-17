import { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { MessageSquare, Plus, Send, AlertCircle, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useListConversations, 
  useGetConversation, 
  useCreateConversation,
  getListConversationsQueryKey,
  getGetConversationQueryKey,
  Message
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function Chat() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const conversationId = params.id ? parseInt(params.id, 10) : null;
  const queryClient = useQueryClient();

  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Data fetching
  const { data: conversations, isLoading: conversationsLoading } = useListConversations();
  const { data: activeConversation, isLoading: conversationLoading } = useGetConversation(
    conversationId as number,
    { query: { enabled: !!conversationId } }
  );
  
  const createConversation = useCreateConversation();

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeConversation?.messages, streamedText]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isStreaming) return;

    let targetId = conversationId;
    const messageContent = input;
    setInput("");
    setStreamedText("");
    setIsStreaming(true);

    try {
      // Create conversation if it doesn't exist
      if (!targetId) {
        const newConv = await createConversation.mutateAsync({
          data: { title: messageContent.slice(0, 50) + (messageContent.length > 50 ? "..." : "") }
        });
        targetId = newConv.id;
        queryClient.invalidateQueries({ queryKey: getListConversationsQueryKey() });
        // Use history.pushState to update URL without unmounting to maintain streaming state
        window.history.pushState({}, '', `${import.meta.env.BASE_URL}chat/${targetId}`);
      }

      // Optimistic user message
      const optimisticMessage: Message = {
        id: Date.now(),
        conversationId: targetId,
        role: "user",
        content: messageContent,
        createdAt: new Date().toISOString()
      };

      if (targetId === conversationId && activeConversation) {
        queryClient.setQueryData(getGetConversationQueryKey(targetId), {
          ...activeConversation,
          messages: [...activeConversation.messages, optimisticMessage]
        });
      }

      // Stream the response
      const res = await fetch(`${import.meta.env.BASE_URL}api/conversations/${targetId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: messageContent }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = decoder.decode(value);
        const lines = text.split('\n').filter(l => l.trim().startsWith('data: '));
        
        for (const line of lines) {
          try {
            const json = JSON.parse(line.slice(6));
            if (json.done) break;
            if (json.content) {
              setStreamedText(prev => prev + json.content);
            }
          } catch (e) {
            console.error("Error parsing SSE JSON", e);
          }
        }
      }

      // Invalidate to get the final complete messages from DB
      queryClient.invalidateQueries({ queryKey: getGetConversationQueryKey(targetId) });
      
      // If we created a new conversation, now navigate officially so React Router knows
      if (!conversationId) {
         setLocation(`/chat/${targetId}`);
      }
      
    } catch (error) {
      console.error("Chat error:", error);
      // Fallback/error handling could go here
    } finally {
      setIsStreaming(false);
      setStreamedText("");
    }
  };

  const handleNewChat = () => {
    setLocation("/chat");
    setInput("");
    setStreamedText("");
  };

  return (
    <div className="flex h-[calc(100dvh-8rem)] md:h-[calc(100dvh-4rem)] rounded-xl border bg-card shadow-sm overflow-hidden">
      {/* Sidebar - History */}
      <div className="hidden md:flex w-80 flex-col border-r bg-muted/20">
        <div className="p-4 border-b">
          <Button onClick={handleNewChat} className="w-full justify-start shadow-sm" variant="default">
            <Plus className="mr-2 h-4 w-4" />
            New Conversation
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {conversationsLoading ? (
              <div className="flex justify-center p-4"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
            ) : conversations?.length === 0 ? (
              <div className="text-center p-4 text-sm text-muted-foreground">
                No past conversations
              </div>
            ) : (
              conversations?.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setLocation(`/chat/${conv.id}`)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg text-sm transition-colors",
                    conversationId === conv.id 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  <div className="truncate">{conv.title || "New Conversation"}</div>
                  <div className="text-xs text-muted-foreground mt-1 font-normal flex items-center gap-1">
                    {format(new Date(conv.updatedAt), "MMM d")} • {conv.messageCount} msgs
                  </div>
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background relative">
        {/* Mobile Header (Shows only when a chat is selected on mobile) */}
        <div className="md:hidden p-3 border-b flex items-center justify-between bg-card shrink-0">
          <span className="font-serif font-medium truncate px-2">
            {conversationId ? (activeConversation?.title || "Chat") : "New Chat"}
          </span>
          <Button size="sm" variant="ghost" onClick={handleNewChat}>
            <Plus className="h-4 w-4 mr-1" /> New
          </Button>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"
        >
          {conversationId && conversationLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
            </div>
          ) : !conversationId && !activeConversation?.messages?.length ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-serif text-foreground">How can I help you today?</h2>
              <p className="text-muted-foreground max-w-md">
                I can explain legal concepts, review documents, or answer questions about Indian law in plain language.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg mt-8 text-left">
                <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setInput("What are my rights if a landlord evicts me without notice?")}>
                  <CardContent className="p-4 text-sm text-muted-foreground">
                    "What are my rights if a landlord evicts me without notice?"
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setInput("Explain the process of filing a consumer complaint.")}>
                  <CardContent className="p-4 text-sm text-muted-foreground">
                    "Explain the process of filing a consumer complaint."
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto w-full pb-4">
              {activeConversation?.messages.map((msg, i) => (
                <div key={msg.id || i} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  <div 
                    className={cn(
                      "px-5 py-3.5 rounded-2xl max-w-[85%] sm:max-w-[75%] text-[15px] leading-relaxed shadow-sm",
                      msg.role === 'user' 
                        ? "bg-primary text-primary-foreground rounded-tr-sm" 
                        : "bg-muted/50 border border-border text-foreground rounded-tl-sm"
                    )}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}
              
              {/* Streaming message */}
              {(isStreaming && streamedText) && (
                <div className="flex w-full justify-start">
                  <div className="px-5 py-3.5 rounded-2xl max-w-[85%] sm:max-w-[75%] text-[15px] leading-relaxed shadow-sm bg-muted/50 border border-border text-foreground rounded-tl-sm">
                    <div className="whitespace-pre-wrap">{streamedText}</div>
                    <span className="inline-block w-1.5 h-4 ml-1 bg-primary/60 animate-pulse align-middle"></span>
                  </div>
                </div>
              )}
              
              {/* Loading indicator */}
              {(isStreaming && !streamedText) && (
                <div className="flex w-full justify-start">
                  <div className="px-5 py-3 rounded-2xl bg-muted/50 border border-border text-muted-foreground flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background border-t shrink-0">
          <form onSubmit={handleSend} className="max-w-3xl mx-auto relative flex items-end gap-2">
            <div className="relative flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Indian law..."
                className="pr-12 py-6 text-base rounded-xl shadow-sm border-muted-foreground/20 focus-visible:ring-primary/30"
                disabled={isStreaming}
              />
            </div>
            <Button 
              type="submit" 
              size="icon" 
              disabled={!input.trim() || isStreaming}
              className="h-12 w-12 rounded-xl shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
          <div className="text-center mt-3">
            <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Saral provides legal information, not formal legal advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
