import { getTocData } from '../lib/api';

export default function Toc({ mdContent }: { mdContent: string }) {
  const mdHeaderArr = getTocData(mdContent);
  const elToc = (
    <ul>
      {mdHeaderArr.map((el, idx) => {        
        return (
          <li key={idx} style={{ marginLeft: `${(el.level - 1) * 20}px` }}>
            <a href={`#${decodeURIComponent(el.text).replace(/\s/g, '-')}`}>{el.text}</a>
          </li>
        );
      })}
    </ul>
  );

  return <nav>{elToc}</nav>;
}
