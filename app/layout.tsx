import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/providers/AppProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';

export const metadata: Metadata = {
  title: 'ATELIER — Curated Everyday Luxury',
  description: 'A premium frontend-only shopping experience powered by localStorage.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className="site-shell">
            <Header />
            <main>{children}</main>
            <Footer />
            <MobileBottomNav />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
