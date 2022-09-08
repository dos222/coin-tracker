import { fetchCoinPrice } from "../api";
import ApexCharts from 'react-apexcharts'
import { useQuery } from "react-query";
interface IcoinPrice {
    time_close: number;
    time_open: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: number;
    market_cap: number;
}

interface priceProps {
    coinId: string;
}

const Price = ({ coinId }: priceProps) => {
    const { isLoading, data } = useQuery<IcoinPrice[]>('coinPrice', () => fetchCoinPrice(coinId))
    const exceptData = data ?? [] 
    const chartData = exceptData?.map((item)=>{ 
        return item.volume})
    
    return (
        <div>
            <h1>Volume-Bar</h1>
            {isLoading ? ("Loading...") : (
                <ApexCharts
                    type="bar"
                    series={[
                        {
                            name : 'Volume',
                            data: chartData
                        }
                    ]}
                    options={
                        {    
                            chart : { 
                                toolbar : { show : false }
                             },
                             plotOptions : {
                                bar : { 
                           
                                    columnWidth : '60%',
                                }
                             },
                             dataLabels : {
                                enabled : false
                             },
                             stroke : { 
                                show: true, 
                                width : 2,
                                colors : ['transparent']
                             },
                             yaxis : { 
                                show : false
                             },
                             colors: ["#0fbcf9"],
                             xaxis : { 
                                labels:{
                                    show:false
                                }
                             }

                        }
                    }
                />
            )
            }
        </div>
    )
}


export default Price