'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { OrderType } from '../interface/post';
import useOrderPosts from '../hook/useOrderPosts';
import { ListGroup, ButtonGroup, ToggleButton } from 'react-bootstrap';

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
      <ButtonGroup>
        <ToggleButton id="1" type="radio" value="new" checked={order === 'new'} onChange={(e) => setOrder(e.currentTarget.value)}>
          new
        </ToggleButton>
        <ToggleButton id="2" type="radio" value="old" checked={order === 'old'} onChange={(e) => setOrder(e.currentTarget.value)}>
          old
        </ToggleButton>
      </ButtonGroup>
      <ListGroup as="ol" variant="flush">
        {orderData.map((el, idx) => {
          const url = `/post/${el.slug.replace(/\s/g, '-')}`;
          const date = `${el.date.getFullYear()}-${el.date.getMonth()}-${el.date.getDate()}`;
          return (
            <ListGroup.Item as="li" action key={idx}>
              <Link href={url}>{el.slug}</Link>
              <p>{el.date && date}</p>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
}
