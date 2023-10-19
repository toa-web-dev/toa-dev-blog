'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import PostType from '../interface/post';

type PostlistProps = {
  data: Array<PostType>;
};

export default function Postlist({ data }: PostlistProps) {
  const [orderedData, setOrderedData] = useState(data);
  const [order, setOrder] = useState('new');

  useEffect(() => {
    if (order === 'new') {
      setOrderedData(
        data.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
      );
    }
    if (order === 'old') {
      setOrderedData(
        data.sort((post1, post2) => (post1.date > post2.date ? 1 : -1))
      );
    }
  }, [order]);

  return (
    <>
      <button onClick={() => setOrder('new')}>new</button>
      <button onClick={() => setOrder('old')}>old</button>
      <ol>
        {orderedData.map((el, idx) => (
          typeof el.slug === 'string' &&  el.date instanceof Date &&
          <li key={idx}>
            <Link href={`/post/${el.slug.replace(/\s/g, '-')}`}>{el.slug}</Link>
            <p>{el.date && `${el.date.getFullYear()}-${el.date.getMonth()}-${el.date.getDate()}`}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
