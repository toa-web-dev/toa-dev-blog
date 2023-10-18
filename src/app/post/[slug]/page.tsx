import { getPostBySlug } from '@/src/lib/api';
import markdownToHtml from '@/src/lib/markdownToHtml';

type PageParams = {
  slug: string;
};

export default async function Page({ params }: { params: PageParams }) {
  const pathname = decodeURIComponent(params.slug);
  const splitArray = pathname.split('-');
  const currentPostTitle = splitArray.join(' ');

  const postInfo = getPostBySlug(currentPostTitle, ['slug', 'content']);
  const html = await markdownToHtml(postInfo.content);
  
  return (
    <article>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
