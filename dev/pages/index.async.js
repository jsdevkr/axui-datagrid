import asyncRoute from './asyncRoute';

export const Introduction = asyncRoute( () => import('./Introduction') );
export const Usage = asyncRoute( () => import('./Usage') );
export const Props = asyncRoute( () => import('./Props') );
export const ExampleRoot = asyncRoute( () => import('./ExampleRoot') );