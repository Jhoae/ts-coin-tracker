import { useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useParams,
  useMatch,
  useNavigate,
} from 'react-router-dom';
import {
  Description,
  Overview,
  OverviewItem,
  Tab,
  Tabs,
  GoHomeBtn,
} from '../../styles/CoinDetail/Coin';
import { Container, Header, Loader, Title } from '../../styles/Coins';
import { fetchCoinInfo, fetchCoinTickers } from '../../api';

function Coin() {
  const urlData = useParams();
  const { state } = useLocation();
  /* ===
  const location = useLocation();
  console.log(location.state.name);
  */

  interface IInfoProps {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    tags: object;
    team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: object;
    links_extended: object;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
  }
  interface IPriceInfoProps {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: string;
        volume_24h_change_24h: number;
      };
    };
  }

  /* 
  react-query 도입전 코드.
 api.ts -- react-query로 대체
 
 const [loading, setLoading] = useState(true);
 const [info, setInfo] = useState<IInfoProps>();
 const [priceInfo, setPriceInfo] = useState<IPriceInfoProps>();
 const getCoinData = async () => {
   const InfoData = await axios(
     `https://api.coinpaprika.com/v1/coins/${urlData.coinId}`
     );
    const priceData =
      await axios(`https://api.coinpaprika.com/v1/tickers/${urlData.coinId}
    `);

    setInfo(InfoData.data);
    setPriceInfo(priceData.data);
  };

  useEffect(() => {
    getCoinData();
  }, []);
  useEffect(() => {
    if (info && priceInfo) {
      setLoading(false);
    }
  }, [info, priceInfo]); 
  */
  // ===>
  const { isLoading: infoLoading, data: info } = useQuery<IInfoProps>(
    ['info', urlData.coinId],
    () => fetchCoinInfo(urlData.coinId),
    {
      refetchInterval: 5000,
    }
  );
  const { isLoading: tickersLoading, data: priceInfo } =
    useQuery<IPriceInfoProps>(
      ['tickers', urlData.coinId],
      () => fetchCoinTickers(urlData.coinId),
      {
        refetchInterval: 5000,
      }
    );
  const loading = infoLoading || tickersLoading;

  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');

  const navigate = useNavigate();

  return (
    <Container>
      <Header className="header">
        <GoHomeBtn onClick={() => navigate('/')}>Home</GoHomeBtn>

        {/*
         state가 존재하면 state.name, 
        state가 존재하지 않으면 url의 data를 사용
        === {state ? `${state.name}` : `${urlData.coinId}`}
        */}
        <Title className="title">{state?.name || urlData.coinId}</Title>
      </Header>
      {loading && <Loader className="loader">Loading...</Loader>}

      {loading ? null : (
        // <Loader>222222Loading...</Loader>
        <>
          <Overview className="overView">
            <OverviewItem className="overViewItem">
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem className="overViewItem">
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem className="overViewItem">
              <span>Price</span>
              <span>
                {priceInfo?.quotes?.USD &&
                  priceInfo?.quotes?.USD?.price?.toFixed(3)}
              </span>
            </OverviewItem>
          </Overview>
          <Description className="description">{info?.description}</Description>
          <Overview className="overView">
            <OverviewItem className="overViewItem">
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem className="overViewItem">
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={urlData.coinId} />
        </>
      )}
    </Container>
  );
}
export default Coin;
