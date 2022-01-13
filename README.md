# Next.js: The React Framework

Enter Next.js, the React Framework. Next.js provides a solution to all of the above problems. But more importantly, it puts you and your team in the pit of success when building React applications.

Next.js aims to have best-in-class developer experience and many built-in features, such as:

- An intuitive page-based routing system (with support for dynamic routes)
- Pre-rendering, both static generation (SSG) and server-side rendering (SSR) are supported on a per-page basis
- Automatic code splitting for faster page loads
- Client-side routing with optimized prefetching
- Built-in CSS and Sass support, and support for any CSS-in-JS library
- Development environment with Fast Refresh support
- API routes to build API endpoints with Serverless Functions
- Fully extendable

Next.js is used in tens of thousands of production-facing websites and web applications, including many of the world's largest brands.

## Pages

In Next.js, a page is a React Component exported from a file in the _pages directory_.

Pages are associated with a route based on their file name. For example, in development:

- _pages/index.js_ is associated with the / route.
- _pages/posts/first-post.js_ is associated with the _/posts/first-post_ route.

We already have the _pages/index.js_ file, so let’s create _pages/posts/first-post.js_ to see how it works.

```javascript
export default function FirstPost() {
  return <h1>First Post</h1>;
}
```

The component can have any name, but you must export it as a _default_ export.

## Link Component

When linking between pages on websites, you use the _<a>_ HTML tag.

In Next.js, you use the _Link_ Component from _next/link_ to wrap the _<a>_ tag. _<Link>_ allows you to do client-side navigation to a different page in the application.

### Using _<Link>_

First, open _pages/index.js_, and import the _Link_ component from _next/link_ by adding this line at the top:

```javascript
import Link from "next/link";

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
```

## Client-Side Navigation

The _Link_ component enables **client-side navigation** between two pages in the same Next.js app.

Client-side navigation means that the page transition happens using JavaScript, which is faster than the default navigation done by the browser.

## Code Splitting

Next.js does code splitting automatically, so each page only loads what’s necessary for that page. That means when the homepage is rendered, the code for other pages is not served initially.

This ensures that the homepage loads quickly even if you have hundreds of pages.

Only loading the code for the page you request also means that pages become isolated. If a certain page throws an error, the rest of the application would still work.

Furthermore, in a production build of Next.js, whenever _Link_ components appear in the browser’s viewport, Next.js automatically prefetches the code for the linked page in the background. By the time you click the link, the code for the destination page will already be loaded in the background, and the page transition will be near-instant!

### Note

If you need to link to an external page outside the Next.js app, just use an <a> tag without Link.

If you need to add attributes like, for example, className, add it to the a tag, not to the Link tag.

```javascript
// Example: Adding className with <Link>
import Link from "next/link";

export default function LinkClassnameExample() {
  // To add attributes like className, target, rel, etc.
  // add them to the <a> tag, not to the <Link> tag.
  return (
    <Link href="/">
      <a className="foo" target="_blank" rel="noopener noreferrer">
        Hello World
      </a>
    </Link>
  );
}

// Take a look at https://nextjs.org/docs/api-reference/next/link
// to learn more!
```

## Assets, Metadata and CSS

Next.js has built-in support for CSS and Sass. For this course, we will use CSS.

## Assets

Next.js can serve static assets, like images, under the top-level public directory. Files inside public can be referenced from the root of the application similar to pages.

The public directory is also useful for robots.txt, Google Site Verification, and any other static assets. Check out the documentation for [Static File](https://nextjs.org/docs/basic-features/static-file-serving) Serving to learn more.

### Unoptimized Image

With regular HTML, you would add your profile picture as follows:

```html
<img src="/images/profile.jpg" alt="Your Name" />
```

However, this means you have to manually handle:

- Ensuring your image is responsive on different screen sizes
- Optimizing your images with a third-party tool or library
- Only loading images when they enter the viewport

And more. Instead, Next.js provides an _Image_ component out of the box to handle this for you.

### Image Component and Image Optimization

_next/image_ is an extension of the HTML _<img>_ element, evolved for the modern web.

Next.js also has support for Image Optimization by default. This allows for resizing, optimizing, and serving images in modern formats like WebP when the browser supports it. This avoids shipping large images to devices with a smaller viewport. It also allows Next.js to automatically adopt future image formats and serve them to browsers that support those formats.

Automatic Image Optimization works with any image source. Even if the image is hosted by an external data source, like a CMS, it can still be optimized.

### Using the Image Component

Instead of optimizing images at build time, Next.js optimizes images on-demand, as users request them. Unlike static site generators and static-only solutions, your build times aren't increased, whether shipping 10 images or 10 million images.

Images are lazy loaded by default. That means your page speed isn't penalized for images outside the viewport. Images load as they are scrolled into viewport.

Images are always rendered in such a way as to avoid Cumulative Layout Shift, a Core Web Vital that Google is going to use in search ranking.

Here's an example using next/image to display our profile picture. The height and width props should be the desired rendering size, with an aspect ratio identical to the source image.

```javascript
import Image from "next/image";

const YourComponent = () => (
  <Image
    src="/images/profile.jpg" // Route of the image file
    height={144} // Desired size with correct aspect ratio
    width={144} // Desired size with correct aspect ratio
    alt="Your Name"
  />
);
```

## Metadata

What if we wanted to modify the metadata of the page, such as the _<title>_ HTML tag?

_<title>_ is part of the _<head>_ HTML tag, so let's dive into how we can modify the _<head>_ tag in a Next.js page.

Open _pages/index.js_ in your editor and find the following lines:

```javascript
import Head from "next/head";

<Head>
  <title>Create Next App</title>
  <link rel="icon" href="/favicon.ico" />
</Head>;
```

Notice that _<Head>_ is used instead of the lowercase _<head>_. _<Head>_ is a React Component that is built into Next.js. It allows you to modify the _<head>_ of a page.

You can import the _Head_ component from the _next/head_ module.

### Notes

If you want to customize the _<html>_ tag, for example to add the lang attribute, you can do so by creating a _pages/\_document.js_ file. Learn more in the [custom Document documentation](https://nextjs.org/docs/advanced-features/custom-document).

## Third Party JavaScript

**Third-party JavaScript** refers to any scripts that are added from a third-party source. Usually, third-party scripts are included in order to introduce newer functionality into a site that does not need to be written from scratch, such as analytics, ads, and customer support widgets.

Let's dive into how we can add a third-party script to a Next.js page.

Open _pages/posts/first-post.js_ in your editor and find the following lines:

```javascript
<Head>
  <title>First Post</title>
</Head>
```

In addition to metadata, scripts that need to load and execute as soon as possible are usually added within the _<head>_ of a page. Using a regular HTML _<script>_ element, an external script would be added as follows:

```javascript
<Head>
  <title>First Post</title>
  <script src="https://connect.facebook.net/en_US/sdk.js" />
</Head>
```

This script contains the Facebook SDK which is commonly used to introduce Facebook social plugins and other functionality. Although this approach works, including scripts in this manner does not give a clear idea of when it would load with respect to the other JavaScript code fetched on the same page. If a particular script is render-blocking and can delay page content from loading, this can signficiantly impact performance.

## Script Component

_next/script_ is an extension of the HTML _<script>_ element and optimizes when additional scripts are fetched and executed.

In the same file, add an import for _Script_ from _next/script_ at the beginning of the file:

```javascript
import Script from "next/script";

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
```

Notice that a few additional properties have been defined in the Script component:

- _strategy_ controls when the third-party script should load. A value of lazyOnload tells Next.js to load this particular script lazily during browser idle time.
- _onLoad_ is used to run any JavaScript code immediately after the script has finished loading. In this example, we log a message to the console that mentions that the script has loaded correctly.

## CSS Styling

Next.js has built-in support for styled-jsx, but you can also use other popular CSS-in-JS libraries such as styled-components or emotion.

```javascript
<style jsx>{`
  …
`}</style>
```

It’s a “CSS-in-JS” library — it lets you write CSS within a React component, and the CSS styles will be scoped (other components won’t be affected).

### Writing and Importing CSS

Next.js has built-in support for CSS and Sass which allows you to import .css and .scss files.

Using popular CSS libraries like Tailwind CSS is also supported.

### CSS Modules

Next.js supports CSS Modules using the _[name].module.css_ file naming convention.

CSS Modules locally scope CSS by automatically creating a unique class name. This allows you to use the same CSS class name in different files without worrying about collisions.

This behavior makes CSS Modules the ideal way to include component-level CSS. CSS Module files can be imported anywhere in your application.

This is what CSS Modules does: It automatically generates unique class names. As long as you use CSS Modules, you don’t have to worry about class name collisions.

Furthermore, Next.js’s code splitting feature works on CSS Modules as well. It ensures the minimal amount of CSS is loaded for each page. This results in smaller bundle sizes.

CSS Modules are extracted from the JavaScript bundles at build time and generate .css files that are loaded automatically by Next.js.

```css
/*
You do not need to worry about .error {} colliding with any other `.css` or
`.module.css` files!
*/
.error {
  color: white;
  background-color: red;
}
```

```javascript
import styles from "./Button.module.css";

export function Button() {
  return (
    <button
      type="button"
      // Note how the "error" class is accessed as a property on the imported
      // `styles` object.
      className={styles.error}
    >
      Destroy
    </button>
  );
}
```

### Global Styles

CSS Modules are useful for component-level styles. But if you want some CSS to be loaded by every page, Next.js has support for that as well.

To load _global CSS_ files, create a file called _pages/\_app.js_ with the following content:

```javascript
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

This _App_ component is the top-level component which will be common across all the different pages. You can use this _App_ component to keep state when navigating between pages, for example.

## Adding Global CSS

In Next.js, you can add global CSS files by importing them from _pages/\_app.js_. You **cannot** import global CSS anywhere else.

The reason that global CSS can't be imported outside of pages/\_app.js is that global CSS affects all elements on the page.

If you were to navigate from the homepage to the /posts/first-post page, global styles from the homepage would affect /posts/first-post unintentionally.

You can place the global CSS file anywhere and use any name. So let’s do the following:

- Create a top-level styles directory and create global.css inside.
- Add the following content to styles/global.css.
- Import the CSS file in _pages/\_app.js_

## Styling Tips

### Using classnames library to toggle classes

_classnames_ is a simple library that lets you toggle class names easily. You can install it using _npm install classnames_ or _yarn add classnames_.

Please take a look at its _documentation_ for more details, but here’s the basic usage:

- Suppose that you want to create an _Alert_ component which accepts _type_, which can be _'success'_ or _'error'_.
- If it’s _'success'_, you want the text color to be green. If it’s _'error'_, you want the text color to be red.

You can first write a CSS module (e.g. alert.module.css) like this:

```css
.success {
  color: green;
}
.error {
  color: red;
}
```

And use classnames like this:

```javascript
import styles from "./alert.module.css";
import cn from "classnames";

export default function Alert({ children, type }) {
  return (
    <div
      className={cn({
        [styles.success]: type === "success",
        [styles.error]: type === "error",
      })}
    >
      {children}
    </div>
  );
}
```

### Using SASS

Out of the box, Next.js allows you to import _Sass_ using both the _.scss_ and _.sass_ extensions. You can use component-level Sass via _CSS Modules_ and the _.module.scss_ or _.module.sass_ extension.

Before you can use Next.js' built-in Sass support, be sure to install _sass_:

```bash
npm install sass
```
