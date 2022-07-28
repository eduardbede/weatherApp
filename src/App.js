import React from "react";
import { useEffect, useState } from "react";
import MainTemp from "./components/MainTemp";
import HourlyTemp from "./components/HourlyTemp";
import DailyTemp from "./components/DailyTemp";
import Footer from "./components/Footer";
export default function App(){
    

    const [isDarkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')));
    const toggleDarkMode = () => {
        setDarkMode(prevDark => !prevDark);
      };
    
    useEffect(()=>{
        localStorage.setItem('darkMode', isDarkMode)
    },[isDarkMode])

    const darkModeStyle = {color: isDarkMode ? "white" : "black"}
    const [meteo, setMeteo] = useState({
                                current_weather: '',
                                hourly:'',
                                daily:'',

    });
    const [inputLocation, setInputLocation] = useState('');
    const [location, setLocation] = useState([])
    const [judOras, setJudOras] = useState([{
                                    oras: 'Întorsura Buzăului',
                                    jud: 'Covasna'
                }])
    const [coordonate, setCoordonate] = useState([{
                                                lat: 45.68333,
                                                long: 26.03333
    }])
    const [coordonateIp, setCoordonateIp] = useState([{
                                                lat: '',
                                                long: ''
    }])
    const [ipRegion, setIpRegion] = useState([{
                                            oras: '',
                                            jud: ''
}])

    const [noRes, setNoRes] = useState([])

   useEffect(()=>{
        if(inputLocation.length === 0){
            setLocation([])
            setNoRes([])
        }else if(location.length === 0) {
            setNoRes(["No result!"])
        }else if(location.length > 3){
            setLocation([])
            setNoRes(["No result!"])
        }

    },[inputLocation])

    function inputValues(e){
        setInputLocation(e.target.value)
    }
    useEffect(()=>{
        const timer = setTimeout(()=>{
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${inputLocation}`)
            .then(res => res.json())
            .then(data =>{
                    if(data.results !== undefined){
                        setLocation(data.results)
                    } 
            }) 

        }, 700)

        return () => clearTimeout(timer)
        
    },[inputLocation])


    useEffect(()=>{
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordonate[0].lat}&longitude=${coordonate[0].long}&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FMoscow`)
        .then(res => res.json())
        .then(data =>setMeteo({ current_weather: data.current_weather,
                                hourly:data.hourly,
                                daily:data.daily,
                            }))
    }, [location, coordonate])


    useEffect(()=>{
        fetch("https://ipinfo.io/json?token=a52e57c897dccc")
        .then(res => res.json())
        .then(data=>{
            const index = data.loc.indexOf(",")
            const lat = parseInt(data.loc.slice(0, index))
            const long = parseInt(data.loc.slice(index+1, data.loc.length))
            setCoordonateIp([{
                lat: lat,
                long: long
    }])
        setIpRegion([{
                oras: data.city,
                jud: data.region
    }])

     }

    ).catch((error) => {
        console.log(error)
      })

    
    },[location])

    function coordonateIpClick(){
        setCoordonate(coordonateIp)
        setJudOras(ipRegion)
    }

 function judetOnClick(e){
 
      setLocation(location.filter(el=>{
        return el.id === parseInt(e.target.id)

    }))
        setJudOras(location.filter(el=>{return el.id === parseInt(e.target.id)}).map(el=>{return {oras:el.name, jud: el.admin1}}))
        setCoordonate(location.filter(el=>{return el.id === parseInt(e.target.id)}).map(el=>{return {lat:el.latitude, long: el.longitude}})) 
        setLocation([])
        setInputLocation([])
        
    } 


    return(
        <div style={{ backgroundColor: isDarkMode ? "black" : "white"}} className="min-h-screen">
            <MainTemp darkMode={isDarkMode}
                      colorDarkMode={darkModeStyle}
                      darkFunction={toggleDarkMode}
                      inputChangeLocation={inputValues}
                      clickCoordonateIp={coordonateIpClick}
                      valueInput={inputLocation}
                      noResults={noRes}
                      locationSelect={location}
                      divClick={judetOnClick}
                      judOras={judOras}
                      currentTemp={meteo.current_weather.temperature} 
                       />

            <HourlyTemp darkMode={isDarkMode}
                        colorDarkMode={darkModeStyle}
                        currentTemp={meteo}/>

            <DailyTemp  darkMode={isDarkMode}
                        colorDarkMode={darkModeStyle}
                        currentTemp={meteo.daily}/>
            <Footer     darkMode={isDarkMode}
                        colorDarkMode={darkModeStyle}/>
        </div>
           
    )
}