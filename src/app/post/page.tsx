import Postlist from '@/src/components/Postlist';
import { getAllPosts } from '@/src/lib/api';
import PostType from '@/src/interface/post';

type OrderedData = Pick<PostType, 'slug' | 'date'>;

export default function Page() {
  const postList = getAllPosts(['slug', 'date']);
  const postListData = postList as OrderedData[];

  return <div>{postListData && <Postlist data={postListData} />}</div>;
}
