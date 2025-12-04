import { Metadata } from 'next';
import "./globals.css";
import Navigation from '@/components/ui/Navigation';
import MobileNav from '@/components/ui/MobileNav';
import OfflineIndicator from '@/components/pwa/OfflineIndicator';
import ServiceWorkerRegister from '@/components/pwa/ServiceWorkerRegister';
import InstallPrompt from '@/components/pwa/InstallPrompt';
import TFIChatbot from '@/components/ai/TFIChatbot';
import AuthProvider from '@/components/auth/AuthProvider';
import QueryProvider from '@/components/providers/QueryProvider';

export const metadata: Metadata = {
  title: "TFI Timeline",
  description: "The Ultimate Timeline of Telugu Cinema Events",
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'TFI Timeline',
  },
  formatDetection: {
    telephone: false,
  },
};

import { AuthProvider } from '@/components/auth/AuthProvider';
import QueryProvider from '@/components/providers/QueryProvider';
import TFIChatbot from '@/components/ai/TFIChatbot';
import ServiceWorkerRegister from '@/components/pwa/ServiceWorkerRegister';
import InstallPrompt from '@/components/pwa/InstallPrompt';
import OfflineIndicator from '@/components/pwa/OfflineIndicator';
import MobileNav from '@/components/pwa/MobileNav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <AuthProvider>
          <QueryProvider>
            <ServiceWorkerRegister />
            <InstallPrompt />
            <OfflineIndicator />
            <Navigation />
            {children}
            <MobileNav />
            <TFIChatbot />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
