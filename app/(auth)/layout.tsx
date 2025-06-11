const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center w-full bg-purple-100">
      {children}
    </main>
  );
};

export default Layout;
