import Link from "next/link";

export default function BlogPage() {
    return <main>
        <h1>The Blog Page</h1>
        <p><Link href={"/blog/post-1"}>Post One</Link></p>
        <p><Link href={"/blog/post-2"}>Post Two</Link></p>
    </main>;
};