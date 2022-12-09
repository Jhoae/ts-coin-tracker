import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCoinsList } from '../api';
import {
  Coin,
  CoinsList,
  Container,
  Header,
  Title,
  Loader,
  CoinIcon,
} from '../styles/Coins';

interface ICoinProps {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  /*  
  api.ts 파일의 -- reactQuery로 대체
  
  const [coins, setCoins] = useState<ICoinProps[]>([]);
  const [loading, setLoading] = useState(true);
  const getCoins = async () => {
    const res = await axios('https://api.coinpaprika.com/v1/coins');
    setCoins(res.data.slice(0, 20));
    setLoading(false);
  };
  useEffect(() => {
    getCoins();
  }, []); 
  */

  // + react-query가 데이터를 캐시에 저장해두기때문에,
  // 뒤로가기를 눌러도, "/" 페이지에서 로딩X
  const { isLoading: loading, data: coins } = useQuery<ICoinProps[]>(
    ['allCoins'],
    fetchCoinsList
  );

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins?.slice(0, 20).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={`/${coin.id}`}
                state={{ name: coin.name, symbol: coin.symbol.toLowerCase() }}
              >
                <CoinIcon
                  alt="icons"
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
