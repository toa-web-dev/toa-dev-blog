import Link from 'next/link';

export default function LinkToPost({ slug }: { [key: string]: string }) {
  return <Link href={`/post/${slug.replace(/\s/g, '-')}`}>{slug}</Link>;
}
