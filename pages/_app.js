/*
CSS Modules are useful for component-level styles. 
But if you want some CSS to be loaded by every page, Next.js has support for that as well.

To load global CSS files, create a file called pages/_app.js and import it.
*/
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
