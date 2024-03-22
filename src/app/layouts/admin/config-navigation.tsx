import React from 'react';
import SvgColor from 'app/components/SvgColor';

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

interface navConfig {
  title: string;
  path: string;
  icon: React.Component;
}

const navConfig: Array<navConfig> = [
  {
    title: 'dashboard',
    path: '/admin/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'users',
    path: '/admin/users',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/admin/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/admin/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/admin/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/admin/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
