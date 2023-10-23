import Postlist from '@/src/components/Postlist';
import { getAllPosts } from '@/src/lib/api';
import { OrderType } from '@/src/interface/post';

export default function PostList() {
  const postList = getAllPosts(['slug', 'date']);
  const postListData = postList as OrderType[];

  return <div>{postListData && <Postlist data={postListData} />}</div>;
}
