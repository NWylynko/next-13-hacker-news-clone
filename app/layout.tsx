
const RootLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <html>
      <body style={{ fontFamily: "sans-serif" }}>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;