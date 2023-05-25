import { useEffect, useState } from 'react';
import './App.css'
import Widget from './components/Widget/Widget';


function App() {
  const [validator, setValidator] = useState(false)
  useEffect(() => {
    console.log(!navigator.geolocation)
    if (!navigator.geolocation) {
      alert("su navegador no tiene la opcion de Geolocalizacion")
      setValidator(true)
    }
  }, [])

  return (
    <>
      {validator ? <></> : <Widget />}
    </>

  )
}

export default App
