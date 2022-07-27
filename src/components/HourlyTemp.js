
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirIcon from '@mui/icons-material/Air';
import { WiDaySunnyOvercast, WiDaySunny, WiFog, WiHumidity, WiRainMix, WiRain, WiSnow, WiShowers, WiThunderstorm } from "react-icons/wi";
import { DateTime } from "luxon";
import { Info } from 'luxon';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';


export default function HourlyTemp(props){

    const [sunriseSunset, setSunriseSunset] =   useState({
        sunrise: "",
        sunset: ''
    })
    const [indexTime, setIndexTime] = useState()
    const [humidity, setHumidity] = useState('');
    const [hours, setHours] = useState([]);
    const [hoursIcons, setHoursIcons] = useState([]);
    const [hoursTemp, setHoursTemp] = useState([]);

    const hourMap = hours.map(el=>{
        return <div key={nanoid()} className="w-10 h-10 text-center font-bold font-mono flex justify-center items-center text-xl">{el}</div>
    })
    
    const iconWeather = hoursIcons.map(el=>{
        return <div key={nanoid()} className="w-10 h-10 text-center font-bold font-mono flex justify-center items-center text-xl">{el}</div>
    })
    
    const divTemp = hoursTemp.map(el=>{
        return <div key={nanoid()} className="w-10 h-10 text-center font-bold font-mono flex justify-center items-center text-sm md:text-xl ">{el}°</div>
    })
    //functie care ne afiseaza ce si a saptamanii este
    function dayOfTheWeek(){
        const todayDayNumber = DateTime.now().weekday -1
        const weekDayName = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday',]
        const todayDay = weekDayName[todayDayNumber]
        return todayDay
    }
    
    const todayDayDate = DateTime.now().setLocale('en-GB').toLocaleString()
    

//functie care ne arata cum este vremea actuala
    function weatherNow(){
        const code = props.currentTemp.current_weather.weathercode;
        let nowWeather = ''
        if (code === 0){
            nowWeather = "Clear sky";
        }else if (code >= 1 && code <= 3 ){
            nowWeather = "Partly Cloudy";
        }else if(code >= 45 && code <= 48 ){
            nowWeather = "Fog";
        }else if(code >= 51 && code <= 55 ){
            nowWeather = "Drizzle";
        }else if(code >= 56 && code <= 57 ){
            nowWeather = "Freezing Drizzle";
        }else if(code >= 61 && code <= 65 ){
            nowWeather = "Rain";
        }else if(code >= 66 && code <= 67 ){
            nowWeather = "Freezing Rain";
        }else if(code >= 71 && code <= 75 ){
            nowWeather = "Snow fall";
        }else if(code === 77 ){
            nowWeather = "Snow";
        }else if(code >= 80 && code <= 82 ){
            nowWeather = "Rain";
        }else if(code >= 85 && code <= 86 ){
            nowWeather = "Snow";
        }else if(code >= 95 && code <= 96  ){
            nowWeather = "Thunderstorm";
        }

        return nowWeather
    }
    
    const windSpeed = props.currentTemp.current_weather.windspeed
    
    useEffect(()=>{
        if(props.currentTemp.daily.sunrise !== undefined && indexTime !== undefined){
            setSunriseSunset({  sunrise : DateTime.fromISO(props.currentTemp.daily.sunrise[0]).toFormat("HH:mm").toLocaleString(),
                                sunset : DateTime.fromISO(props.currentTemp.daily.sunset[0]).toFormat("HH:mm").toLocaleString()
            })
        } 
       
    },[props.currentTemp.daily.sunrise, props.currentTemp.daily.sunset, indexTime])

    useEffect(()=>{
        if(props.currentTemp.hourly.time === undefined && indexTime === undefined){
            return 
        } else{
            const indexOfTime = props.currentTemp.hourly.time.indexOf(props.currentTemp.current_weather.time)
            setIndexTime(indexOfTime)
        }
    },[props.currentTemp.current_weather.time, props.currentTemp.hourly.time , indexTime])
 
   
    useEffect(()=>{
        if(props.currentTemp.hourly.relativehumidity_2m !== undefined && indexTime !== undefined){
            setHumidity(props.currentTemp.hourly.relativehumidity_2m[indexTime])
        } else{
            
        }
       
    },[props.currentTemp.hourly.relativehumidity_2m, indexTime])

    useEffect(()=>{
        if(props.currentTemp.hourly.time !== undefined && indexTime !== undefined){
            const hours = props.currentTemp.hourly.time.slice(indexTime+1, indexTime+8)
            const hoursMap = hours.map(el=>{
           return DateTime.fromISO(el).toFormat("HH").toLocaleString()
        })
        setHours(hoursMap)
        } 
        
        
    },[props.currentTemp.hourly.time, indexTime])
    
    useEffect(()=>{
        if(props.currentTemp.hourly.weathercode !== undefined && indexTime !== undefined){
            const hourlyWeatherCode = props.currentTemp.hourly.weathercode.slice(indexTime+1, indexTime+8);
            const icons = hourlyWeatherCode.map(el=>{
            if (el === 0){
                return <WiDaySunny size="2em" />
            }else if (el >= 1 && el <= 3 ){
                return <WiDaySunnyOvercast size="2em" />
            }else if(el >= 45 && el <= 48 ){
                return <WiFog size="2em" />
            }else if(el >= 51 && el <= 55 ){
                return <WiRainMix size="2em" />;
            }else if(el >= 56 && el <= 57 ){
                return  <WiRainMix size="2em" />;
            }else if(el >= 61 && el <= 65 ){
                return  <WiRain size="2em" />;
            }else if(el >= 66 && el <= 67 ){
                return  <WiRain size="2em" />;
            }else if(el >= 71 && el <= 75 ){
                return  <WiSnow size="2em" />;
            }else if(el === 77 ){
                return  <WiSnow size="2em" />;
            }else if(el >= 80 && el <= 82 ){
                return  <WiShowers size="2em" />;
            }else if(el >= 85 && el <= 86 ){
                return  <WiSnow size="2em" />;
            }else if(el >= 95 && el <= 96 ){
                return  <WiThunderstorm size="2em" />;
            }
            
           })
           setHoursIcons(icons)
        }
    },[props.currentTemp.hourly.weathercode, indexTime])

   
    useEffect(()=>{
        if(props.currentTemp.hourly.temperature_2m !== undefined && indexTime !== undefined){
            setHoursTemp(props.currentTemp.hourly.temperature_2m.slice(indexTime+1, indexTime+8))
        }
    },[props.currentTemp.hourly.temperature_2m, indexTime])

    return(
        <div className="px-8 md:px-32">
            <div style={props.colorDarkMode} className="flex justify-between md:text-2xl md:justify-center md:gap-20 font-mono font-bold">
                <div className="flex gap-2 pb-8 text-sm md:text-xl">
                    <p>{dayOfTheWeek()}</p>
                    <p >{todayDayDate}</p>
                </div>
                <p className='text-sm md:text-xl'>{weatherNow()}</p>
            </div>
            <div style={props.colorDarkMode} className='flex gap-16 md:justify-center md:gap-32 pb-7 font-mono font-bold'>
                <div className='flex items-start flex-col md:flex-row md:gap-4'>
                    <div className='flex gap-1'>
                        <div><AirIcon /></div>
                        <h1>{windSpeed}km/h</h1>
                    </div>
                    <div className='flex gap-1'>
                        <WiHumidity size="1.5em" />
                        <h1>{humidity}%</h1>
                    </div>
                </div>
                <div className='flex md:gap-10'>
                    <div className='text-center'>Sunrise: {sunriseSunset.sunrise}</div>
                    <div className='text-center'>Sunset: {sunriseSunset.sunset}</div>
                </div>
            </div>
            <div style={props.colorDarkMode}>
                <div className='flex justify-between md:justify-center md:gap-12' >
                    {hourMap}
                </div>
                <div className='flex justify-between md:justify-center md:gap-12' >
                    {iconWeather}
                </div>
                <div className='flex justify-between md:justify-center md:gap-12' >
                    {divTemp}
                </div>
            </div>
                <div className='w-full md:flex md:justify-center'>
                    <div style={{borderColor: props.darkMode? "white" : "black"}} className='border-b border-black pt-3 md:w-96'></div>
                </div>
        </div>
    )
}