import './App.css'
import { KH_MRT_DATA } from 'data/KH-MART'
import Mapbox from 'map'
import ReactSvgUrl from 'assets/react.svg'

function App() {
  return <Mapbox dataset={KH_MRT_DATA} iconData={{ react: ReactSvgUrl }} />
}

export default App
