export default function setHeaderTagId(HTML: string): string {
  const htmlArray = HTML.split('\n');

  for (let i = 0; i < htmlArray.length; i++) {
    const match = /<h([1-6])>(.*?)<\/h[1-6]>/.exec(htmlArray[i]);

    if (match) {
      const level = match[1];
      const text = match[2];
      // 고유한 ID 생성 (예: header-1, header-2, ...)
      const uniqueID = text.replace(/\s+/g, '-').toLowerCase();
      // ID를 추가한 새로운 헤더 태그 생성
      const newHeaderTag = `<h${level} id="${uniqueID}">${text}</h${level}>`;
      // 원래 배열의 해당 요소를 바꿔치기
      htmlArray[i] = newHeaderTag;
    }
  }
  const HTMLwithHeaderTagId = htmlArray.join('\n');

  return HTMLwithHeaderTagId;
}
