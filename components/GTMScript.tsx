// ─────────────────────────────────────────────────────────────────────────────
// GTMScript — Server Component.
// Injects the GTM <script> in <head> and <noscript> after <body>.
// Import and render this from each funnel's page.tsx using next/script.
// ─────────────────────────────────────────────────────────────────────────────
import Script from 'next/script';
import { buildGTMNoScriptSrc } from '@/lib/gtm';

interface GTMScriptProps {
  containerId: string;
}

export default function GTMScript({ containerId }: GTMScriptProps) {
  if (!containerId) return null;

  const noscriptSrc = buildGTMNoScriptSrc(containerId);

  return (
    <>
      {/* GTM head script — Strategy "afterInteractive" defers until hydration */}
      <Script
        id="gtm-head"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');`,
        }}
      />

      {/* GTM noscript fallback — renders an iframe for non-JS environments */}
      <noscript>
        <iframe
          src={noscriptSrc}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="GTM noscript"
        />
      </noscript>
    </>
  );
}
