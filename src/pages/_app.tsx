import "../styles/globals.css";
import { ConnectKitProvider } from "connectkit";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { config } from "../wagmi";

function setTwitterCardMetadata() {
  const twitterCardMetaTags = [
    { name: 'twitter:card', content: 'Intersections' },
    { name: 'twitter:title', content: 'Intersections by FeltZine' },
    { name: 'twitter:description', content: 'What if we kissed at the intersection of?' },
    { name: 'twitter:image', content: 'https://i.ibb.co/X8qTzXJ/27.png' },
    { name: 'twitter:url', content: 'clouds.feltzine.art' },
  ];

  twitterCardMetaTags.forEach((metaTag) => {
    const tag = document.createElement('meta');
    tag.setAttribute('name', metaTag.name);
    tag.setAttribute('content', metaTag.content);
    document.head.appendChild(tag);
  });
}

setTwitterCardMetadata();

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="minimal">
        <NextHead>
          <title>Intersections By Felt Zine</title>
        </NextHead>
        <div
		style={{
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			zIndex: '-1',        
			backgroundImage: 'url("https://i.ibb.co/C5BKzgS/felt-pic.png")',  //https://i.ibb.co/X8qTzXJ/27.png"
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
      backgroundPosition: 'center',
				//backgroundColor: 'transparent',
			backgroundColor: 'rgba(0, 0, 0, 0)', // Adjust the alpha value (0.5) for transparency
		}}></div>                  

        {mounted ? <Component {...pageProps} /> : <div />}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
