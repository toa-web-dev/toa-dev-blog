'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Postlist({data}) {
  const [order, setOrder] = useState('new');
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(
      data.sort((post1, post2) => {
        if (order === 'new') return post1.date > post2.date ? -1 : 1;
        if (order === 'old') return post1.date > post2.date ? 1 : -1;
        else return 0;
      })
    );
  }, [order]);

  return (
    <>
      <button onClick={() => setOrder('new')}>new</button>
      <button onClick={() => setOrder('old')}>old</button>
      <ol>
        {orderedData.map((el, idx) => (
          <li key={idx}>
            <Link href={`/post/${el.slug.replace(/\s/g, '-')}`}>{el.slug}</Link>
            <p>{el.date.toString()}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
