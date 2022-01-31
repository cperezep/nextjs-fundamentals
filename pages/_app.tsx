/*
CSS Modules are useful for component-level styles. 
But if you want some CSS to be loaded by every page, Next.js has support for that as well.

To load global CSS files, create a file called pages/_app.js and import it.
*/
import { AppProps } from "next/app";
import "../styles/global.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
