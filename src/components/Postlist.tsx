'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { OrderType } from '../interface/post';
import useOrderPosts from '../hook/useOrderPosts';
import style from './Postlist.module.scss';

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
      <div className={style.order_button_container}>
        <button onClick={() => setOrder('new')}>new</button>
        <button onClick={() => setOrder('old')}>old</button>
      </div>
      <ul style={{ gridColumn: "1 / 9" }}>
        {orderData.map((el, idx) => {
          const url = `/blog/${el.slug.replace(/\s/g, '-')}`;
          const date = `${el.date.getFullYear()}-${el.date.getMonth()}-${el.date.getDate()}`;
          return (
            <li className={style.article_entry} key={idx}>
              <Link href={url}>
                <h2>{el.slug}</h2>
              </Link>
              <p>{el.date && date}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
