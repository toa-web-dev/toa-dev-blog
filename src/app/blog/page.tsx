import Postlist from '@/src/components/Postlist';
import { getAllPosts } from '@/src/lib/api';
import { OrderType } from '@/src/interface/post';
import Section from '@/src/components/Section';

export default function Page() {
  const postList = getAllPosts(['slug', 'date']);
  const postListData = postList as OrderType[];

  return (
    <>
      <Section>
        {/* 카테고리 버튼 및 캐치프레이즈 */}
      </Section>
      <Section>{postListData && <Postlist data={postListData} />}</Section>
    </>
  );
}
