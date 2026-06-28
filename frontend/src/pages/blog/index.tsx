import Head from "next/head";
import Link from "next/link";

export default function Blog() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-black bg-white px-6">
      <Head>
        <title>Blog — Samba Carlson</title>
        <meta name="description" content="Blog posts by Samba Carlson." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://sambacarlson.vercel.app/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog — Samba Carlson" />
        <meta property="og:description" content="Blog posts by Samba Carlson." />
        <meta property="og:image" content="https://sambacarlson.vercel.app/me1.jpg" />
        <meta property="og:url" content="https://sambacarlson.vercel.app/blog" />
      </Head>

      <div className="fixed top-10 left-[5%]">
        <Link
          href="/"
          className="rounded-lg py-2 px-4 border-2 text-sm border-default text-default bg-white hover:bg-defaultLight duration-300"
        >
          &larr; Back
        </Link>
      </div>

      <div className="flex flex-col items-center space-y-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" className="text-default">
          <path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h14V5H5zm2 4h10v2H7V9zm0 4h8v2H7v-2z"/>
        </svg>
        <h1 className="text-3xl font-semibold">Blog</h1>
        <p className="text-defaultLight text-lg">I&apos;m working on this. Stay tuned!</p>
      </div>
    </main>
  );
}
