import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { FileText, Search, Clock, Download, Copy, Check, ChevronLeft } from "lucide-react";
import { useListDocuments, LegalDocument } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Documents() {
  const [search, setSearch] = useState("");
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const { data: documents, isLoading } = useListDocuments();
  
  // Extract id from search params if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      setSelectedDocId(parseInt(id, 10));
    }
  }, []);

  const filteredDocs = documents?.filter(doc => 
    doc.title.toLowerCase().includes(search.toLowerCase()) || 
    doc.documentType.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const selectedDoc = documents?.find(d => d.id === selectedDocId);

  const handleCopy = () => {
    if (!selectedDoc) return;
    navigator.clipboard.writeText(selectedDoc.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!selectedDoc) return;
    const blob = new Blob([selectedDoc.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedDoc.title.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (selectedDocId && selectedDoc) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => {
            setSelectedDocId(null);
            window.history.pushState({}, '', `${import.meta.env.BASE_URL}documents`);
          }}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-serif text-foreground">{selectedDoc.title}</h1>
            <div className="flex items-center gap-3 mt-1">
              <Badge variant="secondary">{selectedDoc.documentType}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {format(new Date(selectedDoc.createdAt), 'MMMM d, yyyy')}
              </span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              Copy
            </Button>
            <Button size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-0">
            <ScrollArea className="h-[600px] w-full rounded-md border-0">
              <div className="p-8 md:p-12">
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none font-serif whitespace-pre-wrap">
                  {selectedDoc.content}
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-foreground">My Documents</h1>
          <p className="text-muted-foreground mt-1">View and manage all your generated legal documents.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search documents..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-xl border border-dashed">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-serif text-foreground mb-2">No documents found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            {search ? "No documents match your search criteria." : "You haven't generated any legal documents yet."}
          </p>
          {!search && (
            <Button asChild>
              <Link href="/create">Create a Document</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <Card 
              key={doc.id} 
              className="group hover:border-primary/50 transition-all cursor-pointer flex flex-col h-full"
              onClick={() => {
                setSelectedDocId(doc.id);
                window.history.pushState({}, '', `${import.meta.env.BASE_URL}documents?id=${doc.id}`);
              }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="p-2.5 bg-primary/10 rounded-lg text-primary shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="shrink-0 bg-background">
                    {doc.documentType}
                  </Badge>
                </div>
                <CardTitle className="line-clamp-2 text-lg font-serif group-hover:text-primary transition-colors">
                  {doc.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-1.5 mt-2">
                  <Clock className="h-3.5 w-3.5" />
                  {format(new Date(doc.createdAt), 'MMM d, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 mt-auto">
                <div className="text-sm text-muted-foreground line-clamp-3 bg-muted/30 p-3 rounded-md border border-border/50 font-serif relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/80 z-10" />
                  {doc.content}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
