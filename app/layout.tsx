import type { Metadata, Viewport } from 'next';
import GTMScript from '@/components/GTMScript';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Free Webinar Training',
    template: '%s | The Cash Flow Academy',
  },
  description: 'Reserve your free seat for our exclusive live training.',
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? '';

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Google Fonts — loaded via <link> to avoid render-blocking @import */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {gtmId && <GTMScript containerId={gtmId} />}
        {children}
      </body>
    </html>
  );
}
