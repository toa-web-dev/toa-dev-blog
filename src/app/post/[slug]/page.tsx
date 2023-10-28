import { getPostBySlug, getPrevNextSlugs } from '@/src/lib/api';
import markdownToHtml from '@/src/lib/markdownToHtml';
import Link from 'next/link';
import { PostType } from '@/src/interface/post';
import TableOfContent from '@/src/components/TableOfContent';
import setHeaderTagId from '@/src/lib/setHeaderTagId';

type Params = {
  slug: string;
};
type PostInfo = Pick<PostType, 'slug' | 'content'>;

export default async function Post({ params }: { params: Params }) {
  const pathname = decodeURIComponent(params.slug);
  const spacedPathname = pathname.split('-').join(' ');
  const initPostInfo = getPostBySlug(spacedPathname, ['slug', 'content']);
  const postInfo = initPostInfo as PostInfo;
  const HTML = await markdownToHtml(postInfo.content);
  const HTMLwithHeaderTagId = setHeaderTagId(HTML);

  
  const { prev, next } = getPrevNextSlugs(postInfo.slug);

  return (
    <>
      {/* // 목차는 마크다운을 정규표현식으로 분석? */}
      <TableOfContent mdContent={postInfo.content}/>
      <article>
        <div dangerouslySetInnerHTML={{ __html: HTMLwithHeaderTagId }} />
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
