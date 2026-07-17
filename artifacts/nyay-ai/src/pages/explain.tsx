import { useState, useRef, useEffect } from "react";
import { Sparkles, Languages, FileText, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "ta", label: "Tamil" },
  { value: "bn", label: "Bengali" },
  { value: "te", label: "Telugu" },
  { value: "mr", label: "Marathi" },
];

export default function Explain() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [isStreaming, setIsStreaming] = useState(false);
  const [explanation, setExplanation] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [explanation]);

  const handleExplain = async () => {
    if (!text.trim() || isStreaming) return;

    setIsStreaming(true);
    setExplanation("");

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/legal/explain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });

      if (!res.ok) throw new Error("Failed to explain document");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.trim().startsWith('data: '));

        for (const line of lines) {
          try {
            const json = JSON.parse(line.slice(6));
            if (json.done) break;
            if (json.content) {
              setExplanation(prev => prev + json.content);
            }
          } catch (e) {
            console.error("Error parsing SSE JSON", e);
          }
        }
      }
    } catch (error) {
      console.error("Explain error:", error);
      setExplanation("An error occurred while trying to explain the document. Please try again or check your connection.");
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-serif text-foreground mb-4">Understand Any Legal Document</h1>
        <p className="text-lg text-muted-foreground">
          Paste confusing legal text, court notices, or contracts below. We'll break it down into simple, easy-to-understand language.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch min-h-[600px]">
        {/* Input Panel */}
        <Card className="flex flex-col border-border shadow-sm h-full">
          <CardHeader className="border-b bg-muted/20 pb-4">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="font-serif text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Original Document
              </CardTitle>
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[130px] h-9 bg-background">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map(lang => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardDescription>
              Paste the text you want explained. Do not include sensitive personal information like Aadhar numbers.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="E.g., 'WITNESSETH: That for and in consideration of the mutual covenants and agreements herein contained...'"
              className="flex-1 min-h-[300px] border-0 focus-visible:ring-0 rounded-none resize-none p-6 text-base font-serif"
              disabled={isStreaming}
            />
            <div className="p-4 border-t bg-muted/20 shrink-0">
              <Button 
                size="lg" 
                className="w-full h-12 text-base shadow-sm"
                onClick={handleExplain}
                disabled={!text.trim() || isStreaming}
              >
                {isStreaming ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Document...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Explain in Simple Terms
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="flex flex-col border-border shadow-sm h-full bg-secondary text-secondary-foreground relative overflow-hidden">
          <CardHeader className="border-b border-secondary-foreground/10 pb-4 relative z-10">
            <CardTitle className="font-serif text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Simple Explanation
            </CardTitle>
            <CardDescription className="text-secondary-foreground/70">
              The AI's simplified breakdown will appear here.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 relative z-10">
            <ScrollArea className="h-full w-full" ref={scrollRef}>
              <div className="p-6 md:p-8 min-h-[400px]">
                {!explanation && !isStreaming ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50 py-20">
                    <Sparkles className="h-12 w-12" />
                    <p className="max-w-xs text-lg">Waiting for a document to explain...</p>
                  </div>
                ) : (
                  <div className="prose prose-invert prose-lg max-w-none font-serif leading-relaxed">
                    <div className="whitespace-pre-wrap">{explanation}</div>
                    {isStreaming && (
                      <span className="inline-block w-2 h-5 ml-1 bg-primary animate-pulse align-middle" />
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          {/* Decorative background for output panel */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px]" />
          </div>
        </Card>
      </div>

      <Alert className="bg-primary/10 border-primary/20 text-primary-foreground max-w-3xl mx-auto">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="text-foreground font-serif">Disclaimer</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          This explanation is generated by AI to help you understand legal text. It is not professional legal advice and should not replace consultation with a qualified lawyer.
        </AlertDescription>
      </Alert>
    </div>
  );
}
