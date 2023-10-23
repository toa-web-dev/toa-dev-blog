'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import PostType from '../interface/post';

type OrderedData = Pick<PostType, 'slug' | 'date'>;
type Props = {
  data: OrderedData[];
};

export default function Postlist({ data }: Props) {
  const newestData = [...data].sort((post1, post2) =>
    post1.date > post2.date ? -1 : 1
  );
  const [orderedData, setOrderedData] = useState<OrderedData[]>(newestData);
  const [order, setOrder] = useState('new');

  useEffect(() => {
    if (order === 'new') {
      setOrderedData((prev) =>
        [...prev].sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
      );
    }
    if (order === 'old') {
      setOrderedData((prev) =>
        [...prev].sort((post1, post2) => (post1.date > post2.date ? 1 : -1))
      );
    }
  }, [order]);

  return (
    <>
      <button onClick={() => setOrder('new')}>new</button>
      <button onClick={() => setOrder('old')}>old</button>
      <ol>
        {orderedData.map((el, idx) => (
          <li key={idx}>
            <Link href={`/post/${el.slug.replace(/\s/g, '-')}`}>{el.slug}</Link>
            <p>
              {el.date &&
                `${el.date.getFullYear()}-${el.date.getMonth()}-${el.date.getDate()}`}
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}
