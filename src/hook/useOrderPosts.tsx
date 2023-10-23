import { OrderType } from '../interface/post';

export default function useOrderPosts(arr: OrderType[], order: string = 'new'): OrderType[] {
  let result;
  if (order === 'new') {
    result = [...arr].sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  } else if (order === 'old') {
    result = [...arr].sort((post1, post2) => (post1.date > post2.date ? 1 : -1));
  } else {
    result = useOrderPosts(arr, 'new');
  }
  return result;
}
