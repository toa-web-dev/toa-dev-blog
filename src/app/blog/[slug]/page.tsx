import { getPostBySlug, getPrevNextSlugs } from '@/src/lib/api';
import markdownToHtml from '@/src/lib/markdownToHtml';
import Link from 'next/link';
import { PostType } from '@/src/interface/post';
import TableOfContent from '@/src/components/TableOfContent';
import setHeaderTagId from '@/src/lib/setHeaderTagId';
import Section from '@/src/components/Section';

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
      <Section>
        <article style={{ gridColumn: '1 / 9' }}>
          <div dangerouslySetInnerHTML={{ __html: HTMLwithHeaderTagId }} />
        </article>
        <div style={{ gridColumn: '9 / 11' }}>
          <TableOfContent mdContent={postInfo.content} />
        </div>
      </Section>
      <Section>
        <nav>
          <div>
            {next && (
              <Link href={`/blog/${next}`}>
                다음 게시글 보기 →: <span>{next}</span>
              </Link>
            )}
          </div>
          <div>
            {prev && (
              <Link href={`/blog/${prev}`}>
                이전 게시글 보기 ←: <span>{prev}</span>
              </Link>
            )}
          </div>
        </nav>
      </Section>
    </>
  );
}
