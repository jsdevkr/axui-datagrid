import Loadable from 'react-loadable';
import Loading from './Loading';

export const Introduction = Loadable({
  loader: () => import('./Introduction'),
  loading: Loading,
});

export const Usage = Loadable({
  loader: () => import('./Usage'),
  loading: Loading,
});

export const Props = Loadable({
  loader: () => import('./Props'),
  loading: Loading,
});

export const ExampleRoot = Loadable({
  loader: () => import('./ExampleRoot'),
  loading: Loading,
});