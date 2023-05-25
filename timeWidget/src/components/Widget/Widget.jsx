import React, { useEffect, useState } from 'react'
import { getUserLocation } from '../../services/TimeService'
import "./Widget.css"
import axios from 'axios'
import Geocode from "react-geocode";
import Card from '../Card/Card';
Geocode.setApiKey("AIzaSyBQLYjgPyEu2nXx4_ddNcpL4IAgXwlYIQA")
Geocode.setLanguage("es")
Geocode.setRegion("ar")

// import { prueba5Dyas, pruebaCurrentTime, pruebaLocalizacion } from "../prueba";


export default function Widget() {

  const [currenttimedata, setCurentTimedata] = useState()
  const [weeklytimedata, setWeeklytimedata] = useState()
  const [LatLong, setLatLong] = useState()
  const [LocationData, setLocationData] = useState()
  const [DarkMode, setDarkMode] = useState(false)

  function handleDarkMode() {
    setDarkMode(!DarkMode)
  }

  async function getCurrentTimeData(lngLat) {
    const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lngLat[0]}&lon=${lngLat[1]}&appid=d845dd9a8ba123246f1b29ec1565a10a&units=metric&lang=es`)
    setCurentTimedata(data.data)
  }
  async function getTimeDataWeekly(lngLat) {
    const data = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lngLat[0]}&lon=${lngLat[1]}&cnt=4&appid=d845dd9a8ba123246f1b29ec1565a10a&units=metric&lang=es`)
    setWeeklytimedata(data.data)


  }

  function getLocacionData(lngLat) {
    Geocode.fromLatLng(lngLat[0], lngLat[1]).then(
      (response) => {
        const address = response.results;
        setLocationData(address[4])
      },
      (error) => {
        console.error(error);
      }
    );
  }



  useEffect(() => {
    getUserLocation().then(
      lngLat => {
        setLatLong(lngLat)
        getLocacionData(lngLat)
        getCurrentTimeData(lngLat)
        getTimeDataWeekly(lngLat)
      }
    )
  }, [])


  setInterval(getCurrentTimeData, 600000, LatLong)

  return (
    <div className={DarkMode ? 'widget-Container active' : 'widget-Container'}>
      <div className='container-Img'>
        <h1>{LocationData?.formatted_address}</h1>

        <img src={currenttimedata ? `https://openweathermap.org/img/wn/${currenttimedata?.weather[0]?.icon}@2x.png` : ""} alt="" className='Image' />

        <h4>{currenttimedata?.weather[0].description.toLocaleUpperCase()}</h4>
      </div>
      <div className='Container-Curren-Data'>
        <div className='Container-Current-Data-T'>
          <div className='container-Current-Temperature'>
            <span className='Current-Temperature'>{currenttimedata?.main.temp} Cº</span>
            <div className='Container-Current-Data-T-MXMM'>
              <div className='t-MAX-Min'>
                <span>Max</span>
                <span>{currenttimedata?.main.temp_max} Cº</span>
              </div>
              <div className='t-MAX-Min'>
                <span> Min</span>
                <span>{currenttimedata?.main.temp_min} Cº</span>
              </div>
            </div>
          </div>
          <div className='Container-Current-Data-T-extras'>
            <div className='t-MAX-Min'>
              <span>Viento</span>
              <span>{currenttimedata?.wind.speed} Km/h</span>
            </div>
            <div className='t-MAX-Min'>
              <span>Sensacion Termica</span>
              <span>{currenttimedata?.main.feels_like} Cº</span>
            </div>
            <div className='t-MAX-Min'>
              <span>Humedad</span>
              <span>{currenttimedata?.main.humidity} %</span>
            </div>
          </div>
        </div>
        <div className='Container-Card'>
          {weeklytimedata?.list.map((hour, index) => {
            return <Card hour={hour} key={index} />
          })}
        </div>
        <div className='container-switch'>
          <button className={DarkMode ? "switch active" : "switch"} id="switch" onClick={handleDarkMode}>
            <span><i className="fas fa-sun"></i></span>
            <span><i className="fas fa-moon"></i></span>
          </button>
        </div>
      </div>

    </div>
  )
}
