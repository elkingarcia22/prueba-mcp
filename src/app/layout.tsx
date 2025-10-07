import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/tokens.css";
import Script from "next/script";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from '../theme/theme';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Proyecto con MCP + Design System",
  description: "Proyecto Next.js con MCPs, Chakra UI, Storybook y tokens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ChakraProvider theme={theme}>
          {children}
          
          {/* Microsoft Clarity Analytics */}
          {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ? (
            <Script 
              id="ms-clarity" 
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{ 
                __html: `
                  (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
                `
              }}
            />
          ) : null}
        </ChakraProvider>
      </body>
    </html>
  );
}
