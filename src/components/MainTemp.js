import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import { nanoid } from 'nanoid';

export default function MainTemp(props){

    
    const locations = props.locationSelect
    const locationDivs = locations.map(el=>{
        return <div key={nanoid()} id={el.id} onClick={props.divClick} className='cursor-pointer border h-10 bg-white border-black flex items-center justify-center'>
                                                            {el.name}, {el.admin1}{el.admin1 !== undefined ? ",": el.admin1} {el.country_code}</div>
    })
    const noRes = props.noResults.map(el=>{
        return <div key={nanoid()} className='cursor-pointer border h-10 bg-white border-black flex items-center justify-center'>{el}</div>
    })
    const currentTemp =  props.currentTemp;
    return(
            <div  className="px-8 pb-6">
                <div className="flex justify-around pt-6 items-center">
                        <div style={props.colorDarkMode}>
                            <DarkModeSwitch
                            checked={props.darkMode}
                            onChange={props.darkFunction}
                            size={20}
                            />
                         </div>
                    <div className='flex content-center items-center  relative font-mono'>
                          <input value={props.valueInput}
                                 onChange={e=>props.inputChangeLocation(e)}
                                 placeholder='Search Location' 
                                 type="text" 
                                 className=' border outline-1 border-black rounded-md px-1 focus:outline-none' />
                          <button style={props.colorDarkMode}><SearchIcon /></button>
                    </div>
                            {<div className='absolute top-14 w-80 text-center font-bold'>
                                    {locationDivs.length === 0 ?<>{noRes}</> : <>{locationDivs}</>}
                                    
                            </div>}
                    <div style={props.colorDarkMode} onClick={props.clickCoordonateIp} className='flex items-center hover:cursor-pointer'>
                        <LocationOnIcon />
                    </div>
                </div>
                <div  style={props.colorDarkMode}
                    className='text-3xl flex justify-center pt-5 font-mono text-center font-bold'>{props.judOras[0].oras}{props.judOras[0].jud !== undefined ? "," : props.judOras[0].jud} {props.judOras[0].jud}</div>
                <div style={props.colorDarkMode}
                        className='flex justify-center items-center'>
                    <div className='text-8xl flex justify-center font-mono text-center font-bold '>{currentTemp}</div>
                    <div>
                        <div className='text-7xl font-mono'>&#8451;</div>
                    </div>
                </div>
               
                
            </div>
    )
}