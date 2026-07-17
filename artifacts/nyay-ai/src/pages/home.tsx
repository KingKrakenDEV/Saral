import { Link } from "wouter";
import { MessageSquare, FileText, Sparkles, Scale, ArrowRight, Clock, FileCheck } from "lucide-react";
import { useGetLegalStats, useListConversations, useListDocuments } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useGetLegalStats();
  const { data: conversations, isLoading: conversationsLoading } = useListConversations();
  const { data: documents, isLoading: documentsLoading } = useListDocuments();

  const recentConversations = conversations?.slice(0, 3) || [];
  const recentDocuments = documents?.slice(0, 3) || [];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-secondary px-6 py-16 text-secondary-foreground sm:px-12 sm:py-24">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/20 p-4 ring-1 ring-primary/30">
              <Scale className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-secondary-foreground mb-6">
            Your friendly legal companion.
          </h1>
          <p className="text-lg sm:text-xl text-secondary-foreground/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Understand your rights, untangle confusing paperwork, and create the documents you need—without the jargon or the high fees.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-lg" asChild>
              <Link href="/chat">
                <MessageSquare className="mr-2 h-5 w-5" />
                Ask a Legal Question
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base bg-secondary text-secondary-foreground hover:bg-secondary-foreground/10 border-secondary-foreground/20" asChild>
              <Link href="/explain">
                <Sparkles className="mr-2 h-5 w-5" />
                Explain a Document
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none"></div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card shadow-sm border-card-border">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Conversations</p>
              {statsLoading ? (
                <Skeleton className="h-8 w-16 mt-1" />
              ) : (
                <p className="text-2xl font-serif text-foreground">{stats?.totalConversations || 0}</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-sm border-card-border">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Messages Sent</p>
              {statsLoading ? (
                <Skeleton className="h-8 w-16 mt-1" />
              ) : (
                <p className="text-2xl font-serif text-foreground">{stats?.totalMessages || 0}</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-sm border-card-border">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <FileCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Documents Generated</p>
              {statsLoading ? (
                <Skeleton className="h-8 w-16 mt-1" />
              ) : (
                <p className="text-2xl font-serif text-foreground">{stats?.totalDocuments || 0}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Action Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-serif">Legal Chat</CardTitle>
            <CardDescription>Get plain-language answers to your legal questions under Indian law.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="ghost" className="w-full justify-between" asChild>
              <Link href="/chat">
                Start chat <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-serif">Explain Document</CardTitle>
            <CardDescription>Paste confusing legal text and get a simple breakdown in your language.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="ghost" className="w-full justify-between" asChild>
              <Link href="/explain">
                Explain now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-serif">Create Document</CardTitle>
            <CardDescription>Generate standard legal documents, affidavits, and letters easily.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="ghost" className="w-full justify-between" asChild>
              <Link href="/create">
                Create now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Recent Activity */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Chats */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif text-foreground">Recent Chats</h2>
            <Button variant="link" size="sm" asChild>
              <Link href="/chat">View all</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {conversationsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))
            ) : recentConversations.length > 0 ? (
              recentConversations.map((conv) => (
                <Link key={conv.id} href={`/chat/${conv.id}`}>
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer shadow-sm">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="p-2 bg-muted rounded-md shrink-0">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">
                          {conv.title || "New Conversation"}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(new Date(conv.updatedAt), 'MMM d, yyyy')}
                          </span>
                          <span>•</span>
                          <span>{conv.messageCount} messages</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 border rounded-lg border-dashed bg-muted/30">
                <p className="text-muted-foreground">No recent conversations.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Documents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif text-foreground">Recent Documents</h2>
            <Button variant="link" size="sm" asChild>
              <Link href="/documents">View all</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {documentsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))
            ) : recentDocuments.length > 0 ? (
              recentDocuments.map((doc) => (
                <Link key={doc.id} href={`/documents?id=${doc.id}`}>
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer shadow-sm">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="p-2 bg-muted rounded-md shrink-0">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-medium text-foreground truncate">
                            {doc.title}
                          </h3>
                          <Badge variant="outline" className="shrink-0 text-[10px]">
                            {doc.documentType}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(new Date(doc.createdAt), 'MMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 border rounded-lg border-dashed bg-muted/30">
                <p className="text-muted-foreground">No documents created yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
