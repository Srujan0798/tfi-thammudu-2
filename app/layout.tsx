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
  description: "Your ultimate Telugu Film Industry calendar and social platform",
  manifest: "/manifest.json",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
  themeColor: "#1e293b",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TFI Timeline",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <AuthProvider>
          <QueryProvider>
            <Navigation />
            <MobileNav />
            {children}
            <OfflineIndicator />
            <ServiceWorkerRegister />
            <InstallPrompt />
            <TFIChatbot />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
