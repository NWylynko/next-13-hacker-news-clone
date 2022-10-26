
export default async function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html>
      <head>
        <title>Hacker News</title>
      </head>
      <body style={{ fontFamily: "sans-serif" }}>
        {children}
      </body>
    </html>
  );
}