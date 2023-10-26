import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { PostType, OrderType } from '../interface/post';
import { notFound } from 'next/navigation';

const postsDirectory = join(process.cwd(), 'src/data/_posts');

/**
 * @desc 게시글 마크다운 파일의 이름인 slug를 담은 배열을 반환합니다.
 * @returns string[]
 */
export function getPostSlugs(): string[] {
  try {
    const slugFile = fs.readdirSync(postsDirectory);
    const titleArray = slugFile.map((el) => el.replace(/\.md$/, ''));
    return titleArray;
  } catch (error) {
    console.error('디렉토리 데이터를 가져오는 중 오류 발생:', error);
    return [];
  }
}

/**
 * @desc 게시글의 정보를 객체로 반환합니다.
 * @param slug 찾고자 하는 게시글 파일의 확장자를 제외한 이름
 * @param fields fields 배열에 추가한 요소가 반환값의 key값이 됩니다.
 */
export function getPostBySlug(slug: string, fields: string[] = []) {
  try {
    const fullPath = join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    if (fileContents === undefined) return notFound();

    const { data, content } = matter(fileContents);
    let items: Partial<PostType> = {};

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
  } catch (error) {
    notFound();
  }
}

/**
 * @desc 모든 게시글의 정보를 JSON 형태로 반환합니다.
 * @param fields fields 배열에 추가한 요소가 반환값의 key값이 됩니다.
 */
export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug, fields));
  return posts;
}

export function getPrevNextSlugs(slug: string) {
  const Posts = getAllPosts(['slug', 'date']);
  const sortedPosts = Posts as OrderType[];
  sortedPosts.sort((post1, post2) => (post1.date > post2.date ? 1 : -1));

  const sortedSlugs = sortedPosts.map((el) => el.slug);
  const index = sortedSlugs.indexOf(slug);

  if (index === -1) {
    return { prev: null, next: null };
  }
  const prev = index > 0 ? sortedSlugs[index - 1] : null;
  const next = index < sortedSlugs.length - 1 ? sortedSlugs[index + 1] : null;

  return { prev, next };
}

export function getTocData(mdContent: string) {
  const headerRegex = /^#{1,6}\s+(.+)/gm;
  const headers = [];
  let prevLevel = 0;
  let paragraph = 0;
  let match;

  while ((match = headerRegex.exec(mdContent)) !== null) {
    const headerText = match[1];
    const headerLevel = match[0].match(/#/g)?.length; // 헤더 레벨 계산
    if (headerLevel) {
      headerLevel < prevLevel && paragraph++;
      prevLevel = headerLevel;
    }
    headers.push({ paragraph: paragraph, level: headerLevel, text: headerText });
  }

  return headers;
}
