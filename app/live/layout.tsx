export default function LiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="absolute w-full h-full min-h-dvh">
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src="/african-pattern-nigeria.webp" 
            alt=""
            className="w-full h-full object-cover opacity-5"
          />
        </div>
      </div>
      {children}
    </main>
  );
}