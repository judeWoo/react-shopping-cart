import { v4 as uuid } from 'uuid';

const pages = [
  {
    id: uuid(),
    coverImage: '/static/images/home/nick-morrison-FHnnjk1Yj7Y-unsplash.jpg',
    description: '상품 목록을 보여주는 페이지 입니다.',
    title: '상품 목록 페이지',
    to: '/products'
  },
  {
    id: uuid(),
    coverImage:
      '/static/images/home/boudewijn-huysmans-qv-eCYiVJCw-unsplash.jpg',
    description: '장바구니 물품을 보여주는 페이지 입니다.',
    title: '장바구니 페이지',
    to: '/cart'
  }
];

export default pages;
