import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinHistory } from '../../api';

interface ChartProps {
  coinId: string;
}
interface IHistoryDataProps {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
const PriceDivColumn = styled.div`
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const PriceDiv = styled.div`
  height: 70px;
  padding: 10px;
  background-color: ${(props) => props.theme.PriceDivBackgroundColor};
  font-size: 13px;
  color: black;
  font-weight: bold;
  white-space: nowrap;
  span {
    color: ${(props) => props.theme.PriceDivTextColor};
    position: absolute;
    margin-top: 10px;
    font-weight: bold;
    white-space: nowrap;
    font-size: 17px;
  }
`;

function Price() {
  const coinId = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistoryDataProps[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(`${coinId}`)
  );
  return (
    <PriceDivColumn>
      <PriceDiv>
        Today's open Price : <br />
        <span>{data && data[20].open}$</span>
      </PriceDiv>
      <PriceDiv>
        Today's close Price : <br />
        <span>{data && data[20].close}$</span>
      </PriceDiv>
      <PriceDiv>
        Today's high Price : <br />
        <span>{data && data[20].high}$</span>
      </PriceDiv>
      <PriceDiv>
        Today's low Price : <br />
        <span>{data && data[20].low}$</span>
      </PriceDiv>
      <PriceDiv>
        Today's volume <br />
        <span>{data && data[20].volume}</span>
      </PriceDiv>
    </PriceDivColumn>
  );
}

export default Price;
