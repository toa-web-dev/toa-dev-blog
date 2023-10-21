import { getPostBySlug } from '@/src/lib/api';
import markdownToHtml from '@/src/lib/markdownToHtml';
import { notFound } from 'next/navigation';

type PageParams = {
  slug: string;
};

export default async function Page({ params }: { params: PageParams }) {
  const pathname = decodeURIComponent(params.slug);
  const splitArray = pathname.split('-');
  const currentPostTitle = splitArray.join(' ');
  const postInfo = getPostBySlug(currentPostTitle, ['content']);
  if (typeof postInfo.content !== 'string') {
    return notFound();
  }
  // 변수 html을 캐싱해 최적화 하기
  const html = await markdownToHtml(postInfo.content);
  return (
    <article>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
