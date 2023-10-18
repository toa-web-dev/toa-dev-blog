import { getPostSlugs } from '@/src/lib/api';
import Link from 'next/link';

export default function Page() {
  const postList = getPostSlugs();
  return (
    <div>
      <ol>
        {postList.map((el, idx) => (
          <li key={idx}>
            <Link href={`/post/${el.replace(/\s/g, '-')}`}>{el}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
