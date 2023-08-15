import {
  useRef,
  useCallback,
  ComponentProps,
  useState,
  MouseEventHandler
} from 'react'
import Map, {
  MapRef,
  MapLayerMouseEvent,
  ViewStateChangeEvent
} from 'react-map-gl'
import loadImage from 'utils/loadImage'
import { GeoJSONSource } from 'mapbox-gl'
import { ReactComponent as UpIcon } from 'assets/angles-up-solid.svg'

import 'mapbox-gl/dist/mapbox-gl.css'

interface CustomMapProps extends ComponentProps<typeof Map> {
  iconData?: { [iconId: string]: string }
  pointIconId?: string
  defaultZoom: number
}

const CustomMap = ({
  children,
  iconData,
  defaultZoom,
  ...rest
}: CustomMapProps) => {
  const [clusterCloseBtn, setClusterCloseBtn] = useState(false)
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

  const onZoom = (event: ViewStateChangeEvent) => {
    if (event.viewState.zoom <= defaultZoom + 2 && clusterCloseBtn) {
      setClusterCloseBtn(false)
    } else if (event.viewState.zoom > defaultZoom + 2 && !clusterCloseBtn) {
      setClusterCloseBtn(true)
    }
  }

  const onBackClick: MouseEventHandler = () => {
    const centerLocation = mapRef.current?.getCenter()
    mapRef.current?.easeTo({
      center: centerLocation,
      zoom: defaultZoom + 1,
      duration: 500
    })
    setClusterCloseBtn(false)
  }

  return (
    <>
      {clusterCloseBtn && (
        <button
          onClick={onBackClick}
          style={{
            position: 'absolute',
            right: '3rem',
            bottom: '4.5rem',
            zIndex: 10
          }}
        >
          <UpIcon width={30} height={30} />
        </button>
      )}

      {/* {clusterCloseBtn && (
        <IconButton
          size="large"
          onClick={onBackClick}
          sx={{
            position: 'absolute',
            right: '3rem',
            top: '4.5rem',
            zIndex: 10,
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.8),
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.primary.dark, 0.8)
            }
          }}
        >
          <TopTop
            viewBox="0 0 512 512"
            sx={{ fontSize: '1.5rem', color: 'gray.ff' }}
          />
        </IconButton>
      )} */}
      <Map
        initialViewState={{
          latitude: 23.144864319264016,
          longitude: 120.2458966147924,
          zoom: defaultZoom
        }}
        ref={mapRefCallback}
        mapStyle={`mapbox://styles/mapbox/streets-v12`}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        onClick={onMapClick}
        onZoomEnd={onZoom}
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
    </>
  )
}

export default CustomMap
