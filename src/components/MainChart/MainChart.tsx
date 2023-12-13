import {FC, useEffect, useRef} from "react";
import {ColorType, createChart, isUTCTimestamp, Time, UTCTimestamp} from "lightweight-charts";


interface MainCharProps {
    chartData: any,
    darkMode: boolean
}
const MainChart:FC<MainCharProps> = ({chartData, darkMode}) => {

    const chartContainerRef = useRef<HTMLDivElement| string>('')


    useEffect(() => {
        /*const initialData = [
            { time: '2018-12-22', value: 32.51 },
            { time: '2018-12-23', value: 31.11 },
            { time: '2018-12-24', value: 27.02 },
            { time: '2018-12-25', value: 27.32 },
            { time: '2018-12-26', value: 25.17 },
            { time: '2018-12-27', value: 28.89 },
            { time: '2018-12-28', value: 25.46 },
            { time: '2018-12-29', value: 23.92 },
            { time: '2018-12-30', value: 22.68 },
            { time: '2019-12-31', value: 22.67 }
        ]*/

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

        const chart = createChart(chartContainerRef.current)

        chart.applyOptions(darkMode ? chartOptionsDark : chartOptions)
       // chart.timeScale().timeToCoordinate()
        chart.timeScale().fitContent()
        chart.timeScale().applyOptions({
            timeVisible: true
        })

       // isUTCTimestamp(chartData)
        const seriesOptions = {
            lineColor: '#2962FF',
            topColor: '#2962FF',
            bottomColor: 'rgba(41, 98, 255, 0.28)'
        }

        const seriesOptionsDark = {
            lineColor: '#a229ff',
            topColor: '#a229ff',
            bottomColor: 'rgba(98,41,255,0.28)'
            // test
        }

        const newSeries = chart.addAreaSeries(darkMode ? seriesOptionsDark : seriesOptions)
        console.log(chartData)
       // newSeries.
        newSeries.setData(chartData)

        return () => chart.remove()
    }, [chartData, darkMode]);

    return (
        <div ref={chartContainerRef} className={'mainChart'}>

        </div>
    );
};

export default MainChart;