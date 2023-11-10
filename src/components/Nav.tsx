import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <Link href="/">Home</Link> 
            {/* <Link href="/about">About</Link> */}
            <Link href="/blog">Blog</Link>
        </nav>
    );
}
