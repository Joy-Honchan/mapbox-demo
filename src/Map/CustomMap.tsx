import { useRef, useCallback, ComponentProps } from 'react'
import Map, { MapRef, MapLayerMouseEvent } from 'react-map-gl'
import loadImage from 'utils/loadImage'
import { GeoJSONSource } from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

interface CustomMapProps extends ComponentProps<typeof Map> {
  iconData?: { [iconId: string]: string }
  pointIconId?: string
}

const CustomMap = ({ children, iconData, ...rest }: CustomMapProps) => {
  const mapRef = useRef<MapRef | null>(null)
  const mapRefCallback = useCallback(
    (ref: MapRef | null) => {
      if (ref !== null) {
        mapRef.current = ref
        const map = ref
        if (iconData) {
          Object.entries(iconData).map(([iconId, iconUrl]) =>
            loadImage(map, iconId, iconUrl)
          )

          map.on('styleimagemissing', (e) => {
            const id = e.id
            loadImage(map, id, iconData[id])
          })
        }
      }
    },
    [iconData]
  )
  const onMapClick = (event: MapLayerMouseEvent) => {
    const feature = event.features?.[0]

    // 必須點擊在 cluster 或 point 上才有作用
    if (feature?.geometry?.type === 'Point') {
      const geoCoordinates = feature.geometry.coordinates
      const clusterId = feature.properties?.cluster_id
      const mapboxSource = mapRef.current?.getSource(
        feature?.source
      ) as GeoJSONSource

      // 點在 cluster 上
      if (clusterId) {
        mapboxSource.getClusterExpansionZoom(clusterId, (err) => {
          if (err) {
            return
          }

          mapRef.current?.easeTo({
            center: [geoCoordinates[0], geoCoordinates[1]],
            zoom: 12,
            duration: 500
          })
        })
      } else {
        // 點在 point 上
      }
    }
  }
  return (
    <Map
      initialViewState={{
        latitude: 23.144864319264016,
        longitude: 120.2458966147924,
        zoom: 9
      }}
      ref={mapRefCallback}
      mapStyle={`mapbox://styles/mapbox/streets-v12`}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      // interactiveLayerIds={layerIds || []}
      onClick={onMapClick}
      // onZoomEnd={onZoom}
      // onLoad={onLoad}
      minZoom={5}
      maxZoom={15}
      maxBounds={[
        [115, 20],
        [125, 28]
      ]}
      {...rest}
    >
      {children}
    </Map>
  )
}

export default CustomMap
