import { RouteProvider } from '@/providers/router-provider';
import { Theme } from '@/providers/theme';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <RouteProvider>
        <Theme>
          {children}
        </Theme>
      </RouteProvider>
    </main>
  );
}
