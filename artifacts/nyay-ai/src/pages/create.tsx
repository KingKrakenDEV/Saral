import { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { FileText, ArrowLeft, ArrowRight, Loader2, Download, Copy, Check, CheckCircle2, Search } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useListDocumentTypes, getListDocumentsQueryKey, DocumentType } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function Create() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<DocumentType | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [title, setTitle] = useState("");
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: documentTypes, isLoading: typesLoading } = useListDocumentTypes();

  useEffect(() => {
    if (scrollRef.current && step === 3) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [generatedContent, step]);

  const filteredTypes = documentTypes?.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.description.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleSelectType = (type: DocumentType) => {
    setSelectedType(type);
    setTitle(`My ${type.name}`);
    setFormData({});
    setStep(2);
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || isStreaming) return;

    // Basic validation
    const missingRequired = selectedType.fields.filter(f => f.required && !formData[f.name]);
    if (missingRequired.length > 0) return; // In reality, form handles this with required attributes

    setStep(3);
    setIsStreaming(true);
    setGeneratedContent("");

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/legal/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentType: selectedType.id,
          title: title || `My ${selectedType.name}`,
          fields: formData
        }),
      });

      if (!res.ok) throw new Error("Failed to generate document");

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
              setGeneratedContent(prev => prev + json.content);
            }
          } catch (err) {
            console.error("Error parsing SSE JSON", err);
          }
        }
      }

      // Refresh documents list cache when done
      queryClient.invalidateQueries({ queryKey: getListDocumentsQueryKey() });
      
    } catch (error) {
      console.error("Generate error:", error);
      setGeneratedContent("An error occurred while generating the document. Please try again.");
    } finally {
      setIsStreaming(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-center max-w-2xl mx-auto mb-8">
        <div className="flex items-center w-full">
          <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg border-2 transition-colors ${step >= 1 ? 'border-primary bg-primary/10 text-primary' : 'border-muted bg-muted text-muted-foreground'}`}>
              {step > 1 ? <Check className="h-5 w-5" /> : "1"}
            </div>
            <span className="text-sm font-medium">Select</span>
          </div>
          <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg border-2 transition-colors ${step >= 2 ? 'border-primary bg-primary/10 text-primary' : 'border-muted bg-background text-muted-foreground'}`}>
              {step > 2 ? <Check className="h-5 w-5" /> : "2"}
            </div>
            <span className="text-sm font-medium">Details</span>
          </div>
          <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`flex flex-col items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg border-2 transition-colors ${step >= 3 ? 'border-primary bg-primary/10 text-primary' : 'border-muted bg-background text-muted-foreground'}`}>
              3
            </div>
            <span className="text-sm font-medium">Generate</span>
          </div>
        </div>
      </div>

      {/* Step 1: Select Document Type */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif text-foreground">Choose a Document</h1>
              <p className="text-muted-foreground mt-1">Select the type of legal document you need to create.</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search templates..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-card"
              />
            </div>
          </div>

          {typesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          ) : filteredTypes.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-xl border border-dashed">
              <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-serif text-foreground">No templates found</h3>
              <p className="text-muted-foreground">Try a different search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTypes.map((type) => (
                <Card 
                  key={type.id} 
                  className="group hover:border-primary/50 hover:shadow-md transition-all cursor-pointer flex flex-col h-full bg-card"
                  onClick={() => handleSelectType(type)}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
                      <FileText className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-serif text-xl">{type.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">{type.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-4 border-t border-border/50">
                    <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Create this <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 2: Fill Details */}
      {step === 2 && selectedType && (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
          <Button variant="ghost" className="mb-6 -ml-4" onClick={() => setStep(1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to templates
          </Button>
          
          <Card className="shadow-lg border-primary/20">
            <CardHeader className="bg-primary/5 border-b border-primary/10 pb-6 rounded-t-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-background border flex items-center justify-center shadow-sm shrink-0">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-serif">{selectedType.name}</CardTitle>
                  <CardDescription className="mt-1 text-base">{selectedType.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <form id="doc-form" onSubmit={handleGenerate} className="space-y-6">
                <div className="space-y-2 mb-8">
                  <Label htmlFor="doc-title" className="text-base font-semibold">Document Title</Label>
                  <Input 
                    id="doc-title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                    className="h-12 text-lg font-serif"
                  />
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b pb-2">Required Information</h3>
                  {selectedType.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name} className="text-[15px]">
                        {field.label} {field.required && <span className="text-destructive">*</span>}
                      </Label>
                      {field.type === 'textarea' ? (
                        <Textarea 
                          id={field.name}
                          placeholder={field.placeholder}
                          required={field.required}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          className="min-h-[100px] resize-y bg-background"
                        />
                      ) : (
                        <Input 
                          id={field.name}
                          type={field.type === 'date' ? 'date' : 'text'}
                          placeholder={field.placeholder}
                          required={field.required}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          className="h-11 bg-background"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </form>
            </CardContent>
            <CardFooter className="p-6 sm:p-8 border-t bg-muted/10 rounded-b-xl flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                <span className="text-destructive">*</span> indicates required field
              </span>
              <Button type="submit" form="doc-form" size="lg" className="h-12 px-8">
                Generate Document <CheckCircle2 className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Step 3: Generated Document */}
      {step === 3 && selectedType && (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background p-4 rounded-xl border shadow-sm">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => setStep(2)} disabled={isStreaming} className="shrink-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h2 className="text-xl font-serif font-bold text-foreground line-clamp-1">{title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="font-normal">{selectedType.name}</Badge>
                  {isStreaming && (
                    <span className="text-xs text-primary flex items-center gap-1 font-medium">
                      <Loader2 className="h-3 w-3 animate-spin" /> Generating...
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
              <Button variant="outline" onClick={handleCopy} disabled={isStreaming || !generatedContent}>
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button onClick={handleDownload} disabled={isStreaming || !generatedContent}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <Card className="shadow-lg border-border overflow-hidden">
            <div className="bg-muted/30 border-b p-3 flex justify-between items-center text-xs text-muted-foreground font-mono">
              <span>preview.txt</span>
              <span>UTF-8</span>
            </div>
            <CardContent className="p-0">
              <ScrollArea className="h-[65vh] w-full bg-card" ref={scrollRef}>
                <div className="p-8 sm:p-12 md:p-16">
                  {isStreaming && !generatedContent ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4 opacity-50">
                      <Loader2 className="h-10 w-10 animate-spin text-primary" />
                      <p className="text-lg font-serif">Drafting your document...</p>
                    </div>
                  ) : (
                    <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none font-serif leading-relaxed">
                      <div className="whitespace-pre-wrap">{generatedContent}</div>
                      {isStreaming && (
                        <span className="inline-block w-2 h-5 ml-1 bg-primary animate-pulse align-middle" />
                      )}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            {!isStreaming && generatedContent && (
              <CardFooter className="p-4 border-t bg-muted/10 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Document generated successfully. You can copy or download it using the buttons above.
                </p>
                <Button variant="link" asChild>
                  <Link href="/documents">View all documents &rarr;</Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
