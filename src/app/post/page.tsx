import Postlist from '@/src/components/Postlist';
import { getAllPosts } from '@/src/lib/api';

export default function Page() {
  const postListData = getAllPosts(['slug', 'date']);

  return <div>{postListData && <Postlist data={postListData} />}</div>;
}
