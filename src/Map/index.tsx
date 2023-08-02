import { useRef, ReactNode } from 'react'
import { Map, ViewState } from 'react-map-gl'
// import { useSearchParams } from 'react-router-dom'

import 'mapbox-gl/dist/mapbox-gl.css'

interface MapboxProps {
  initialViewState: Partial<ViewState>
  children?: ReactNode
}
const Mapbox = ({ initialViewState, children }: MapboxProps) => {
  // const [searchParams] = useSearchParams()
  const mapRef = useRef(null)
  // const mapRefCallback = useCallback((map) => {

  // })
  return (
    <Map
      initialViewState={{
        latitude: initialViewState.latitude,
        longitude: initialViewState.longitude,
        zoom: initialViewState.zoom
      }}
      ref={mapRef}
      mapStyle={`mapbox://styles/mapbox/streets-v12`}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      // interactiveLayerIds={layerIds || []}
      // onClick={onMapClick}
      // onZoomEnd={onZoom}
      // onLoad={onLoad}
      minZoom={5}
      maxZoom={15}
      maxBounds={[
        [115, 20],
        [125, 28]
      ]}
    >
      {children}
    </Map>
  )
}

export default Mapbox
