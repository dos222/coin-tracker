import { useQuery } from "react-query";
import { fetchCoinPrice } from "../api";
import ApexCharts from "react-apexcharts";

interface ChartProps {
  coinId: string;
}
interface IcoinPrice {
  time_close: number;
  time_open: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data, error } = useQuery<IcoinPrice[]>("coinPrice", () =>
    fetchCoinPrice(coinId)
  );
  const exceptData = data ?? [];
  const chartData = exceptData?.map((i) => {
    return {
      x: i.time_close,
      y: [i.open, i.high, i.low, i.close],
    };
  });
 
  return (
    <div>
      <h1>Candle Stick</h1>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data: chartData,
            },
          ]} 
          options={{
            chart: {
              toolbar: { show: false },
            },
            xaxis: {
              labels: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
              labels: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
