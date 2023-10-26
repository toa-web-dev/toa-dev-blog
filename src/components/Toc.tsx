import { getTocData } from '../lib/api';

export default function Toc({ mdContent }: { mdContent: string }) {
  const mdHeaderArr = getTocData(mdContent);
  const elToc = (
    <ul>
      {mdHeaderArr.map((el) => (
        <li style={{ marginLeft: `${(el.level -1) * 20}px` }}>
          <span>{el.text}</span>
        </li>
      ))}
    </ul>
  );

  return <nav>{elToc}</nav>;
}
