import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/category">Category</Link>
        </nav>
    );
}
