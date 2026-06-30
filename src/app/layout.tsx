import type { Viewport } from 'next';
import { Mulish, Geist } from 'next/font/google';
import { RouteProvider } from '@/providers/router-provider';
import { Theme } from '@/providers/theme';
import '@/styles/globals.css';
import { cx } from '@/utils/cx';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const mulish = Mulish({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mulish',
});

export const viewport: Viewport = {
  themeColor: '#7f56d9',
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={cx(mulish.variable, 'bg-primary antialiased')}>
        <RouteProvider>
          <Theme>{children}</Theme>
        </RouteProvider>
      </body>
    </html>
  );
}
