import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../../api';
import ApexChart from 'react-apexcharts';

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

function Chart() {
  //  const url = useParams();
  const coinId = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistoryDataProps[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(`${coinId}`),
    {
      refetchInterval: 5000,
    }
  );

  interface ICandleData {
    x: any;
    y: any;
    fillColor?: string;
    strokeColor?: string;
    meta?: any;
    goals?: any;
  }

  const [candleData, setCandleData] = useState<ICandleData[]>();

  useEffect(() => {
    console.log('data', data);
    const newData = data?.map((price) => {
      return {
        x: new Date(price.time_open * 1000),
        y: [
          parseFloat(price.open),
          parseFloat(price.high),
          parseFloat(price.low),
          parseFloat(price.close),
        ],
      };
    });
    console.log('newData', newData);
    setCandleData(newData);
  }, [data]);

  return (
    <div>
      {isLoading ? (
        'Loading Chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[{ data: candleData ?? [] }]}
          options={{
            theme: {
              mode: 'dark',
            },
            title: {
              text: `Chart - ${coinId}`,
              align: 'left',
            },
            chart: {
              type: 'candlestick',
              height: 350,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            stroke: {
              curve: 'smooth',
              width: 2,
            },
            yaxis: {
              show: true,
            },
            xaxis: {
              type: 'datetime',
              categories: data?.map((price) => price.time_close),
              labels: {
                style: {
                  colors: '#495057',
                },
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#087f5b',
                  downward: '#c92a2a',
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
