import type { Metadata, Viewport } from 'next'
import { DM_Sans, Raleway } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const raleway = Raleway({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-nav' })
const body    = DM_Sans({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'CardsMen — Best Scannable IDs',
  description: 'CardsMen — the #1 source for premium scannable fake IDs. Serving USA, Canada, UK, Europe and more. Quality guaranteed.',
  icons: {
    icon:  [
      { url: '/images/cartellogo.jpg', type: 'image/jpeg' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: '/images/cartellogo.jpg',
    shortcut: '/images/cartellogo.jpg',
  },
  openGraph: {
    title: 'CardsMen — Best Scannable IDs',
    description: 'CardsMen — the #1 source for premium scannable fake IDs. Serving USA, Canada, UK, Europe and more. Quality guaranteed.',
    images: ['/images/cartellogo.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'CardsMen — Best Scannable IDs',
    description: 'CardsMen — the #1 source for premium scannable fake IDs. Serving USA, Canada, UK, Europe and more. Quality guaranteed.',
    images: ['/images/cartellogo.jpg'],
  },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#ffffff', userScalable: true }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${raleway.variable} ${body.variable}`}>
      <body className="antialiased">
        {children}

        {/* ── Smartsupp Live Chat ──
            Uses next/script with beforeInteractive so it loads in <head>
            exactly as Smartsupp's own snippet requires.
            The key and variable names are verbatim from the official snippet.
        ── */}
        <Script
          id="smartsupp-chat"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _smartsupp = _smartsupp || {};
              _smartsupp.key = '5f0e982ee30e5f625fdcef11073fbb9263eee07d';
              window.smartsupp||(function(d) {
                var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                s=d.getElementsByTagName('script')[0];
                c=d.createElement('script');
                c.type='text/javascript';
                c.charset='utf-8';
                c.async=true;
                c.src='https://www.smartsuppchat.com/loader.js?';
                s.parentNode.insertBefore(c,s);
              })(document);
            `,
          }}
        />
      </body>
    </html>
  )
}
