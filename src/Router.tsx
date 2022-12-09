import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Chart from './screens/CoinDetail/Chart';
import Coin from './screens/CoinDetail/Coin';
import Price from './screens/CoinDetail/Price';
import Coins from './screens/Coins';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Coins />,
      },
      {
        path: ':coinId',
        element: <Coin />,
        children: [
          {
            path: 'price',
            element: <Price />,
          },
          {
            path: 'chart',
            element: <Chart />,
          },
        ],
      },
    ],
  },
]);

export default router;
