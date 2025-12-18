import { AppSidebar } from "~/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <section className="flex-1 overflow-y-auto">
        <SidebarTrigger className="sticky top-0" />
        {children}
      </section>
    </SidebarProvider>
  );
}
