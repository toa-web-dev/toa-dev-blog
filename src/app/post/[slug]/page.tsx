import { getPostBySlug } from '@/src/lib/api';
import markdownToHtml from '@/src/lib/markdownToHtml';
import Link from 'next/link';
import PostType from '@/src/interface/post';

type Params = {
  slug: string;
};
type PostInfo = Pick<PostType, 'slug' | 'content'>;

export default async function Page({ params }: { params: Params }) {
  const pathname = decodeURIComponent(params.slug);
  const spacedPathname = pathname.split('-').join(' ');
  const initPostInfo = getPostBySlug(spacedPathname, ['slug', 'content']);
  const postInfo = initPostInfo as PostInfo;

  // 변수 html을 캐싱해 최적화 하기
  const html = await markdownToHtml(postInfo.content);

  return (
    <>
      <article>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </>
  );
}
