interface PostType {
  slug: string;
  title: string;
  author: string;
  date: Date;
  content: string;
  [key: string]: any;
}

export default PostType;
