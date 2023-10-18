import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'src/data/_posts');

/**
 * @desc 게시글 마크다운 파일의 이름을 담은 배열을 반환합니다.
 * @returns string[]
 */
export function getPostSlugs(): string[] {
  try {
    const slugFile = fs.readdirSync(postsDirectory);
    const titleArray = slugFile.map((el) => el.replace(/\.md$/, ''));
    return titleArray;
  } catch (error) {
    console.error('디렉토리 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
}

/**
 * @desc 게시글의 정보를 객체로 반환합니다.
 * @param slug 찾고자 하는 게시글 파일의 확장자를 제외한 이름
 * @param fields fields 배열에 추가한 요소가 반환값의 key값이 됩니다.
 */
export function getPostBySlug(slug: string, fields: string[] = []) {
  const fullPath = join(postsDirectory, `${slug}.md`);
  // fileContents 파일 읽기시 예외처리 필요
  // fullPath와 일치하는 파일이 없으면 오류 페이지 출력
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });
  return items;
}

/**
 * @desc 모든 게시글의 원하는 정보를 JSON 형태로 반환합니다.
 * @param fields fields 배열에 추가한 요소가 반환값의 key값이 됩니다.
 */
export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug, fields));
  return posts;
}
