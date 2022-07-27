import { WiDaySunnyOvercast, WiDaySunny, WiFog, WiRainMix, WiRain, WiSnow, WiShowers, WiThunderstorm } from "react-icons/wi";
import { nanoid } from "nanoid";
import { useState, useEffect } from 'react';
import { DateTime } from "luxon";

export default function DailyTemp(props){

    const [dailyIcons, setDailyIcons] = useState([])
    const [dayFuture, setDayFuture] = useState([])
    const [dailyTempMax, setDailyTempMax] = useState([])
    const [dailyTempMin, setDailyTempMin] = useState([])

    const futureDays = dayFuture.map(el=>{
        return <div key={nanoid()} className="font-bold">{el}</div>
    })
    useEffect(()=>{
        if(props.currentTemp.time !== undefined){
            const days = props.currentTemp.time;
            const daysMap = days.map(el=>{
                return DateTime.fromISO(el).toFormat('cccc').toLocaleString()
            })
            setDayFuture(daysMap);
        }
    },[props.currentTemp.time]);
   

    useEffect(()=>{
        if(props.currentTemp.weathercode !== undefined){
            const weatherCode = props.currentTemp.weathercode;
            const weatherCodeMap = weatherCode.map(el=>{
                if (el === 0){
                    return <WiDaySunny size="1.5em" />;
                }else if (el >= 1 && el <= 3 ){
                    return <WiDaySunnyOvercast size="1.5em" />;
                }else if(el >= 45 && el <= 48 ){
                    return <WiFog size="1.5em" />;
                }else if(el >= 51 && el <= 55 ){
                    return <WiRainMix size="1.5em" />;
                }else if(el >= 56 && el <= 57 ){
                    return  <WiRainMix size="1.5em" />;
                }else if(el >= 61 && el <= 65 ){
                    return  <WiRain size="1.5em" />;
                }else if(el >= 66 && el <= 67 ){
                    return  <WiRain size="1.5em" />;
                }else if(el >= 71 && el <= 75 ){
                    return  <WiSnow size="1.5em" />;
                }else if(el === 77 ){
                    return  <WiSnow size="1.5em" />;
                }else if(el >= 80 && el <= 82 ){
                    return  <WiShowers size="1.5em" />;
                }else if(el >= 85 && el <= 86 ){
                    return  <WiSnow size="1.5em" />;
                }else if(el >= 95 && el <= 96 ){
                    return  <WiThunderstorm size="1.5em" />;
                }
            })
            setDailyIcons(weatherCodeMap);
        }
    },[props.currentTemp.weathercode]);
    
    useEffect(()=>{
        if(props.currentTemp.temperature_2m_max !== undefined && props.currentTemp.temperature_2m_min !== undefined){
            setDailyTempMax(props.currentTemp.temperature_2m_max)
            setDailyTempMin(props.currentTemp.temperature_2m_min)
        }
    },[props.currentTemp.temperature_2m_max, props.currentTemp.temperature_2m_min])

    
    const dailyWheather = dailyIcons.map(el=>{
        return <div key={nanoid()}>{el}</div>
    })
  
    const tempMin = dailyTempMin
    const tMin = tempMin.map(el=>{
        return <div key={nanoid()}>{Math.round(el)}°</div>
    })
    const tempMax = dailyTempMax
    const tMax = tempMax.map(el=>{
        return <div key={nanoid()}>{Math.round(el)}°</div>
    })


    return(
        <div style={props.colorDarkMode} className="px-8 flex justify-between pt-4 md:justify-center md:gap-40 pb-5 max-h-screen">
            <div className='flex flex-col justify-between gap-3 md:gap-6 md:text-2xl font-mono'>
                 {futureDays}
            </div>
            <div className='flex flex-col justify-between gap-5 md:gap-6 md:text-2xl md:justify-center'>
                 {dailyWheather}
            </div>
                <div className='flex gap-3 md:gap-6 md:text-2xl'>
                    <div className='flex flex-col gap-5 justify-between  font-mono font-bold'>
                         {tMax}
                    </div>
                   <div className='flex flex-col justify-between gap-5 font-mono'>
                         {tMin}
                   </div>
                </div>
        </div>
    )
}