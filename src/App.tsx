import './App.css'
// import { KH_MRT_DATA } from 'data/KH-MART'
// import Mapbox from 'map'
// import ReactSvgUrl from 'assets/react.svg'

function App() {
  // return <Mapbox dataset={KH_MRT_DATA} iconData={{ react: ReactSvgUrl }} />
  return (
    <section className=" h-screen flex flex-col">
      <header className="bg-orange-500 h-16">Data in Tainan</header>
      <section className="flex flex-grow">
        <div className="bg-orange-300 w-64">SideBar</div>
        <section className=" bg-blue-500 flex-grow">
          <main>Map</main>
        </section>
      </section>
    </section>
  )
}

export default App
