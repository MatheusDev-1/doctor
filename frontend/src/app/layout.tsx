import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import SideNavbar from '@/components/Sidebar';
import { inter } from '@/components/ui/fonts';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { PermissionsProvider } from '@/contexts/PermissionsContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from '@/api/query-client';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Doctor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen w-full bg-white text-black flex',
          `${inter.className} antialiased`,
          {
            'debug-screens': process.env.NODE_ENV === 'development',
          }
        )}
      >
        <QueryClientProvider client={queryClient}>
          <PermissionsProvider>
            <SettingsProvider>
              <SideNavbar />
              <div className='p-8 w-full'>{children}</div>
              <Toaster />
            </SettingsProvider>
          </PermissionsProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
