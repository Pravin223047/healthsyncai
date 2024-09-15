import { ThemeProvider } from "./providers/theme-provider";
import { ModalProvider } from "./providers/modal-provider";
import { QueryProvider } from "./providers/query-provider";
import { SocketProvider } from "./providers/socket-provider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="discord-theme"
        >
          <SocketProvider>
            <ModalProvider />
            <QueryProvider>{children}</QueryProvider>
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
