'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { OrderType } from '../interface/post';
import useOrderPosts from '../hook/useOrderPosts';

type Props = {
  data: OrderType[];
};

export default function Postlist({ data }: Props) {
  const newestData = useOrderPosts(data, 'new');

  const [orderData, setOrderData] = useState<OrderType[]>(newestData);
  const [order, setOrder] = useState('new');

  useEffect(() => {
    setOrderData((prev) => useOrderPosts(prev, order));
  }, [order]);

  return (
    <>
      <button onClick={() => setOrder('new')}>new</button>
      <button onClick={() => setOrder('old')}>old</button>
      <ol>
        {orderData.map((el, idx) => (
          <li key={idx}>
            <Link href={`/post/${el.slug.replace(/\s/g, '-')}`}>{el.slug}</Link>
            <p>{el.date && `${el.date.getFullYear()}-${el.date.getMonth()}-${el.date.getDate()}`}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
