import { AppSidebar } from "~/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="min-h-0 overflow-hidden">
      <AppSidebar />
      <section className="relative min-h-0 flex-1 overflow-y-auto">
        {children}
      </section>
    </SidebarProvider>
  );
}
