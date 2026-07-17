import { Link, useLocation } from "wouter";
import { Scale, MessageSquare, FileText, Sparkles, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: Scale },
  { name: "Legal Chat", href: "/chat", icon: MessageSquare },
  { name: "Explain Document", href: "/explain", icon: Sparkles },
  { name: "Create Document", href: "/create", icon: FileText },
  { name: "My Documents", href: "/documents", icon: BookOpen },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="flex min-h-[100dvh] w-full bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-sidebar md:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Scale className="h-5 w-5" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-sidebar-foreground">Saral</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/50")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-4">
          <div className="rounded-lg bg-sidebar-accent/50 p-4">
            <h4 className="font-serif text-sm font-semibold text-sidebar-foreground">Need urgent help?</h4>
            <p className="mt-1 text-xs text-sidebar-foreground/70">
              National Legal Services Authority Toll Free: 15100
            </p>
          </div>
        </div>
      </aside>

      <main className="flex-1 md:pl-64">
        {/* Mobile Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-md md:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Scale className="h-5 w-5" />
          </div>
          <span className="font-serif text-lg font-bold">Saral</span>
        </header>

        <div className="mx-auto max-w-6xl p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
