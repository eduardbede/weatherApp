
/* import { useEffect, useState, useRef } from "react";
 
export default function Menu(){ */
/* 
    const [meteo, setMeteo] = useState({currentTemperature : '',
                                        
});



    const [inputLocation, setInputLocation] = useState('intorsura buzaului')
    const [location, setLocation] = useState([])
    const [geoCoordinates, setGeoCoordinates] = useState({   
                                                            lat : 45.6741293,
                                                            lon : 26.0335312
                                                })

    useEffect(()=>{
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${inputLocation}`)
        .then(res => res.json())
        .then(data => setLocation(data.results)    
                   
    )}, [inputLocation])


      useEffect(()=>{
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geoCoordinates.lat}&longitude=${geoCoordinates.lon}&hourly=temperature_2m,relativehumidity_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FMoscow`)
        .then(res => res.json())
        .then(data =>setMeteo(data))
    }, [location])




    const refInput = useRef(null);

    const handleClick = () => {
        setInputLocation(refInput.current.value);
};

    const currentTemp = <h1>{meteo.current_weather}</h1>


console.log(location)
console.log(meteo)


    function judetOnClick(e){
        
        setLocation(location.filter(el=>{
            return el.id === parseInt(e.target.id) 

        }))

        refInput.current.value = ''
        setGeoCoordinates({ lat:location[0].latitude,
                            lon:location[0].longitude
                        })
        console.log(geoCoordinates)
        setLocation([])
    }   
 

     */

/*     return (
        <>
         
           
        </>
    )
} */