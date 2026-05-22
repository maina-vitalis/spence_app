import { SessionProvider } from "@/components/providers/SessionProvider";
import { Toaster } from "sonner";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
      <Toaster richColors position="top-right" />
    </SessionProvider>
  );
}
