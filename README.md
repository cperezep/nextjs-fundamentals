# Next.js: The React Framework

Next.js, the React Framework. Next.js provides a solution to all of the above problems.

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

## Pre-rendering

By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.

Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called **hydration.**)

### Check That Pre-rendering Is Happening

In order to check that pre-rendering is happening by taking the following steps:

- Disable JavaScript in your browser [(here’s how in Chrome)](https://developer.chrome.com/docs/devtools/javascript/disable/) and…
- Try accessing this page (the final result of this tutorial).

You should see that your app is rendered without JavaScript. That’s because Next.js has pre-rendered the app into static HTML, allowing you to see the app UI without running JavaScript.

![Pre-rendering](/img/pre-rendering.png "Pre-rendering")

![No Pre-rendering](/img/no-pre-rendering.png "No Pre-rendering")

### Two Forms of Pre-rendering

Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in when it generates the HTML for a page.

- Static Generation is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
- Server-side Rendering is the pre-rendering method that generates the HTML on each request.

![Static Generation](/img/static-generation.png "Static Generation")
![Server Side Generation](/img/server-side-rendering.png "Server Side Rendering")

Next.js lets you choose which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

![Per Page basis](/img/per-page-basis.png "Per Page Basis")

### When to Use [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) v.s. [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering)

We recommend using Static Generation (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page ahead of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use Server-side Rendering. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.

## Static Generation with and without Data

Static Generation can be done with and without data. The pages that not require fetching external data, will automatically be statically generated when the app is built for production.

![Static Generation without Data](/img/static-generation-without-data.png "Static Generation without Data")

However, for some pages, you might not be able to render the HTML without first fetching some external data. Maybe you need to access the file system, fetch external API, or query your database at build time. Next.js supports this case — [Static Generation with data](https://nextjs.org/docs/basic-features/pages#static-generation-with-data) — out of the box.

![Static Generation with Data](/img/static-generation-with-data.png "Static Generation with Data")

### Static Generation with Data using **_getStaticProps_**

How does it work? Well, in Next.js, when you export a page component, you can also export an async function called **_getStaticProps_**. If you do this, then:

- **_getStaticProps_** runs at build time in production, and…
- Inside the function, you can fetch external data and send it as props to the page.

```javascript
import { getSortedPostsData } from "../lib/posts";

export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = getSortedPostsData();

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

Essentially, **_getStaticProps_** allows you to tell Next.js: “Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!”

> > Note: In development mode, **_getStaticProps_** runs on each request instead.

But you can fetch the data from other sources, like an external API endpoint, and it’ll work just fine:

```javascript
export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch("..");
  return res.json();
}
```

You can also query the database directly:

```javascript
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

This is possible because **_getStaticProps_** only runs on the server-side. It will never **run on the client-side**. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.

### Development vs Production

- In development (npm run dev or yarn dev), **_getStaticProps_** runs on every request.
- In production, **_getStaticProps_** runs at build time. However, this behavior can be enhanced using the fallback key returned by getStaticPaths.

Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers.

### Only Allowed in a Page

**_getStaticProps_** can only be exported from a **page**. You can’t export it from non-page files.

One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.

### What If I Need to Fetch Data at Request Time?

Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In cases like this, you can try Server-side Rendering or skip pre-rendering.

### Fetching Data at Request Time

If you need to fetch data at request time instead of at build time, you can try Server-side Rendering:

![Server Side Rendering with Data](/img/server-side-rendering-with-data.png "Server Side Rendering with Data")

To use Server-side Rendering, you need to export **_getServerSideProps_** instead of **_getStaticProps_** from your page.

### Using getServerSideProps

Here’s the starter code for **_getServerSideProps_**.

```javascript
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

Because **_getServerSideProps_** is called at request time, its parameter (context) contains request specific parameters.

You should use **_getServerSideProps_** only if you need to pre-render a page whose data must be fetched at request time. Time to first byte (TTFB) will be slower than **_getStaticProps_** because the server must compute the result on every request, and the result cannot be cached by a CDN without extra configuration.

### Client-side Rendering

If you do not need to pre-render the data, you can also use the following strategy (called Client-side Rendering):

- Statically generate (pre-render) parts of the page that do not require external data.
- When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.

![Client Side Rendering](/img/client-side-rendering.png "Client Side Rendering")

This approach works well for user dashboard pages, for example. Because a dashboard is a private, user-specific page, SEO is not relevant, and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching.

### SWR Hook

The team behind Next.js has created a React hook for data fetching called SWR. We highly recommend it if you’re fetching data on the client side. It handles caching, revalidation, focus tracking, refetching on interval, and more. We won’t cover the details here, but here’s an example usage:

```javascript
import useSWR from "swr";

function Profile() {
  const { data, error } = useSWR("/api/user", fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

## Dynamic Routes

In the case where each page path depends on external data. Next.js allows you to statically generate pages with paths that depend on external data. This enables dynamic URLs in Next.js.

![Page Path Data](/img/page-path-external-data.png "Page Path Data")

### How to Statically Generate Pages with Dynamic Routes

- First, we’ll create a page called **_[id].js_** under **_pages/posts_**. Pages that begin with [ and end with ] are dynamic routes in Next.js.

- Export an async function called getStaticPaths from this page. In this function, we need to return a list of possible values for id.

```javascript
import Layout from "../../components/layout";

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}
```

- Finally, we need to implement **_getStaticProps_** again - this time, to fetch necessary data for the blog post with a given id. **_getStaticProps_** is given params, which contains id (because the file name is [id].js).

```javascript
import Layout from "../../components/layout";

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```

![How to Dynamic Routes](/img/how-to-dynamic-routes.png "How to Dynamic Routes")

### Implement getStaticPaths

```javascript
// lib/posts.js

// It will return the list of file names (excluding .md) in the posts directory
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  // It must be an array of objects, Each object must have the params key and contain an object with the id key
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}
```

```javascript
// pages/posts/[id].js

import { getAllPostIds } from "../../lib/posts";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  // Example: [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]
  return {
    paths,
    fallback: false,
  };
}
```

### Render Markdown

To render markdown content, we’ll use the remark library

```bash
npm install remark remark-html
```

### Implement getStaticProps

```javascript
// lib/posts.js
import { remark } from "remark";
import html from "remark-html";

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}
```

```javascript
// pages/posts/[id].js
import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {/* To render contentHtml using dangerouslySetInnerHTML: */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// The post page is now using the getPostData function in getStaticProps to get the post data and return it as props.
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
```

### Summary

Graphical summary.

![Summary Dynamic Routes](/img/summary-dynamic-routes.png "Summary Dynamic Routes")

### Dynamic Routes Details

### Fetch External API or Query Database

Like getStaticProps, **_getStaticPaths_** can fetch data from any data source. In our example, **_getAllPostIds_** (which is used by **_getStaticPaths_**) may fetch from an external API endpoint:

```javascript
export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch("..");
  const posts = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}
```

### Development vs Production

- In development (npm run dev or yarn dev), getStaticPaths runs on every request.
- In production, getStaticPaths runs at build time.

### Fallback

Recall that we returned **_fallback: false_** from **_getStaticPaths_**. What does this mean?

If **_fallback is false_**, then any paths not returned by **_getStaticPaths_** will result in a 404 page.

If **_fallback is true_**, then the behavior of **_getStaticProps_** changes:

- The paths returned from **_getStaticPaths_** will be rendered to HTML at build time.
- The paths that have not been generated at build time will **not** result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.
- In the background, Next.js will statically generate the requested path. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

If **_fallback is blocking_**, then new paths will be server-side rendered with getStaticProps, and cached for future requests so it only happens once per path.

To learn more about **_fallback: true_** and **_fallback: 'blocking'_** in the [fallback documentation.](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required)

### Catch-all Routes

Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. For example:

- **_pages/posts/[...id].js_** matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.

If you do this, in **_getStaticPaths_**, you must return an array as the value of the id key like so:

```javascript
return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ["a", "b", "c"],
    },
  },
  //...
];
```

And **_params.id_** will be an array in **_getStaticProps_**:

```javascript
export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}
```

### 404 Pages

To create a [custom 404 page](https://nextjs.org/docs/advanced-features/custom-error-page#404-page), create **_pages/404.js_**. This file is statically generated at build time.

```javascript
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}
```

## Creating API Routes

[API Routes](https://nextjs.org/docs/api-routes/introduction) let you create an API endpoint inside a Next.js app. You can do so by creating a function inside the **_pages/api_** directory that has the following format:

```javascript
// req = HTTP incoming message, res = HTTP server response
export default function handler(req, res) {
  // ...
}
```

They can be deployed as Serverless Functions (also known as Lambdas).

### Creating a simple API endpoint

Let’s try it out. Create a file called **_hello.js_** in **_pages/api_** with the following code:

```javascript
export default function handler(req, res) {
  res.status(200).json({ text: "Hello" });
}
```

Try accessing it at http://localhost:3000/api/hello. You should see **_{"text":"Hello"}_**. Note that:

- **_req_** is an instance of **_http.IncomingMessage_**, plus some pre-built middlewares.
- **_res_** is an instance of **_http.ServerResponse_**, plus some helper functions.

### Do Not Fetch an API Route from **_getStaticProps_** or **_getStaticPaths_**

You should not fetch an API Route from **_getStaticProps_** or **_getStaticPaths_**. Instead, write your server-side code directly in **_getStaticProps_** or **_getStaticPaths_** (or call a helper function).

Here’s why: **_getStaticProps_** and **_getStaticPaths_** runs only on the server-side. It will never be run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.

### A Good Use Case: Handling Form Input

A good use case for API Routes is handling form input. For example, you can create a form on your page and have it send a **_POST_** request to your API Route. You can then write code to directly save it to your database. The API Route code will not be part of your client bundle, so you can safely write server-side code.

```javascript
export default function handler(req, res) {
  const email = req.body.email;
  // Then save email to your database, etc...
}
```

### Preview Mode

[Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) is useful when your pages fetch data from a headless CMS. However, it’s not ideal when you’re writing a draft on your headless CMS and want to preview the draft immediately on your page. You’d want Next.js to render these pages at request time instead of build time and fetch the draft content instead of the published content. You’d want Next.js to bypass Static Generation only for this specific case.

Next.js has a feature called [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) to solve the problem above, and it utilizes API Routes.
