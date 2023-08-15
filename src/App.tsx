/// <reference types="vite-plugin-svgr/client" />
import './App.css'
// import { KH_MRT_DATA } from 'data/KH-MART'
import Mapbox from 'map'
import ReactSvgUrl from 'assets/react.svg'
// import Tainan_Hotel_Data from 'data/tainan-hotel-data.json'
import generateData from 'utils/generateData'

function App() {
  // return <Mapbox dataset={KH_MRT_DATA} iconData={{ react: ReactSvgUrl }} />
  const hotelData = generateData()
  return (
    <section className=" h-screen flex flex-col">
      <header className="bg-orange-500 h-16">Data in Tainan</header>
      <section className="flex flex-grow">
        {/* <div className="bg-orange-300 w-64">SideBar</div> */}
        <section className="flex-grow">
          <main className=" h-full">
            <Mapbox
              dataset={hotelData}
              iconData={{ react: ReactSvgUrl }}
              defaultZoom={9}
            />
          </main>
        </section>
      </section>
    </section>
  )
}

export default App
