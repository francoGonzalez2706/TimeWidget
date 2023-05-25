import React from 'react'
import "./Card.css";
export default function Card(hour) {
  return (
    <div className='continer-Card'>
      <span>{hour.hour.dt_txt.substring(10, 16)} hs</span>
      <img src={`https://openweathermap.org/img/wn/${hour.hour?.weather[0].icon}@2x.png`} alt="" className='image-card' />
      <span>{hour.hour?.main?.temp} Cº</span>
    </div>
  )
}
