export const metadata = { title: "Casa - Tarefas" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
