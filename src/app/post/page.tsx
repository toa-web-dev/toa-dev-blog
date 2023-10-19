import Postlist from '@/src/components/Postlist';
import PostType from '@/src/interface/post';
import { getAllPosts } from '@/src/lib/api';


export default function Page() {
  const slugAndDate = getAllPosts(['slug', 'date']);

  return (
    <div>
      <Postlist data={slugAndDate} />
    </div>
  );
}
