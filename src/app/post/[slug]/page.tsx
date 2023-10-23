import { getPostBySlug, getPrevNextSlugs } from '@/src/lib/api';
import markdownToHtml from '@/src/lib/markdownToHtml';
import Link from 'next/link';
import { PostType } from '@/src/interface/post';

type Params = {
  slug: string;
};
type PostInfo = Pick<PostType, 'slug' | 'content'>;

export default async function Post({ params }: { params: Params }) {
  const pathname = decodeURIComponent(params.slug);
  const spacedPathname = pathname.split('-').join(' ');
  const initPostInfo = getPostBySlug(spacedPathname, ['slug', 'content']);
  const postInfo = initPostInfo as PostInfo;

  // 변수 html을 캐싱해 최적화 하기
  const html = await markdownToHtml(postInfo.content);

  const { prev, next } = getPrevNextSlugs(postInfo.slug);

  return (
    <>
      <article>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <div>
        {next && (
          <Link href={`/post/${next}`}>
            다음 게시글 보기 →: <span>{next}</span>
          </Link>
        )}
      </div>
      <div>
        {prev && (
          <Link href={`/post/${prev}`}>
            이전 게시글 보기 ←: <span>{prev}</span>
          </Link>
        )}
      </div>
    </>
  );
}
