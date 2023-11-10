import { getTocData } from '../lib/api';

export default function TableOfContent({ mdContent }: { mdContent: string }) {
  const mdHeaderArr = getTocData(mdContent);

  return (
    <nav>
      <b>목차</b>
      <ul>
        {mdHeaderArr.map((el, idx) => (
          <li key={idx} style={{ marginLeft: `${(el.level - 1) * 20}px` }}>
            <a href={`#${decodeURIComponent(el.text).replace(/\s/g, '-')}`}>{el.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
