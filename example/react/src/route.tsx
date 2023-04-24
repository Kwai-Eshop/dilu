import { RouteObject } from 'react-router-dom';
import DLContent from './component/DLContent';
import Layout from './component/Layout';

const Routes: RouteObject[] = [
  {
    path: '/',
    caseSensitive: true,
    element: <Layout />,
    children: [
      {
        path: '*',
        element: <DLContent />,
      },
    ],
  },
];

export default Routes;
