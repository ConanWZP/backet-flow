import {FC, useEffect, useRef} from "react";
import {AreaData, ColorType, createChart, Time, WhitespaceData} from "lightweight-charts";
import {ITradeHistory} from "../../types/tradeInfo.ts";


interface MainCharProps {
    chartData: ITradeHistory[],
    darkMode: boolean
}
const MainChart:FC<MainCharProps> = ({chartData, darkMode}) => {

    const chartContainerRef = useRef(null )


    useEffect(() => {

        const chartOptions = {
            layout: {
                background: {type: ColorType.Solid, color: 'white'}
            },
            width: 800,
            height: 500,
        }

        const chartOptionsDark = {
            layout: {
                background: {color: '#1f1f1f'},
                textColor: '#DDD',
            },
            grid: {
                vertLines: {color: '#444'},
                horzLines: {color: '#444'},
            },
            width: 800,
            height: 500,
        }


        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const chart = createChart(chartContainerRef.current)

        chart.applyOptions(darkMode ? chartOptionsDark : chartOptions)

        chart.timeScale().fitContent()
        chart.timeScale().applyOptions({
            timeVisible: true
        })


        const seriesOptions = {
            lineColor: '#2962FF',
            topColor: '#2962FF',
            bottomColor: 'rgba(41, 98, 255, 0.28)'
        }

        const seriesOptionsDark = {
            lineColor: '#a229ff',
            topColor: '#a229ff',
            bottomColor: 'rgba(98,41,255,0.28)'
        }

        const newSeries = chart.addAreaSeries(darkMode ? seriesOptionsDark : seriesOptions)


        newSeries.setData(chartData as (AreaData<Time> | WhitespaceData<Time>)[])

        return () => chart.remove()
    }, [chartData, darkMode]);

    return (
        <div ref={chartContainerRef} className={'mainChart'}>

        </div>
    );
};

export default MainChart;