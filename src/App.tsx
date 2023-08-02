import './App.css'
import Mapbox from 'map'
// import { Source, Layer } from 'react-map-gl'

function App() {
  return (
    <>
      <Mapbox
        initialViewState={{
          latitude: 23.144864319264016,
          longitude: 120.2458966147924,
          zoom: 11
        }}
      ></Mapbox>
    </>
  )
}

export default App
