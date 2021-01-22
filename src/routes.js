import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout';
import CartView from 'src/views/cart/CartView';
import HomeView from 'src/views/home/HomeView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductsView from 'src/views/products/ProductsView';
import CheckoutSuccessView from 'src/views/success/CheckoutSuccessView';

export const childRoutes = [
  { path: 'cart', element: <CartView /> },
  { path: 'checkoutSuccess', element: <CheckoutSuccessView /> },
  { path: 'home', element: <HomeView /> },
  { path: '404', element: <NotFoundView /> },
  { path: 'products', element: <ProductsView /> },
  { path: '/', element: <Navigate to="/home" /> },
  { path: '*', element: <Navigate to="/404" /> }
];

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: childRoutes
  }
];

export default routes;
