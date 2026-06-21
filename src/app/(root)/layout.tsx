import { Header } from '@/components/marketing/header-navigation/header';
import { RouteProvider } from '@/providers/router-provider';
import { Theme } from '@/providers/theme';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <RouteProvider>
        <Theme>
          <Header />
          {children}</Theme>
      </RouteProvider>
    </main>
  );
}
