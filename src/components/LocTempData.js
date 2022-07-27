import { useState, useEffect, useRef } from "react";



    
 export default function WeatherData(){
    const [inputLocation, setInputLocation] = useState('intorsura buzaului')
    useEffect(()=>{
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${inputLocation}`)
        .then(res => res.json())
        .then(data => setInputLocation(data.results)    
                    
    )}, [inputLocation])

}

/* const [location, setLocation] = useState([])
const [geoCoordinates, setGeoCoordinates] = useState({   
                                                        lat : 45.6741293,
                                                        lon : 26.0335312
                                            })

    


        
 */

    