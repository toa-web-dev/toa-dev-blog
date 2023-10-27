import { remark } from 'remark';
import html from 'remark-html';

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  const htmlArray = result.value.toString().split('\n');
  const headerTags = htmlArray.filter((item) => /<h[1-6]>/i.test(item));

  for (let i = 0; i < headerTags.length; i++) {
    const headerTag = headerTags[i];
    // 정규식을 사용하여 헤더 태그와 텍스트를 추출
    const match = /<h([1-6])>(.*?)<\/h[1-6]>/.exec(headerTag);
    if (match) {
      const level = match[1];
      const text = match[2];
      // 고유한 ID 생성 (예: header-1, header-2, ...)
      const uniqueID = text;
      // ID를 추가한 새로운 헤더 태그 생성
      const newHeaderTag = `<h${level} id="${uniqueID}">${text}</h${level}>`;
      // 원래 배열의 해당 요소를 바꿔치기
      headerTags[i] = newHeaderTag;
    }
  }
  const headerTagsString = headerTags.join('\n');
  return headerTagsString;
}
