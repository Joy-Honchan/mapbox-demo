import { Source, SourceProps, Layer } from 'react-map-gl'
import { DistrictMRTdataType } from 'data/KH-MART'

interface CustomSourceType extends Omit<SourceProps, 'type' | 'data' | 'id'> {
  prefix?: string
  districtData: DistrictMRTdataType
}

export default function CustomSource({
  prefix,
  districtData,
  children,
  ...rest
}: CustomSourceType) {
  const idPrefix = prefix || 'district'
  return (
    <Source
      id={`${idPrefix}-${districtData.district}`}
      type="geojson"
      data={districtData}
      {...rest}
    >
      <Layer
        id={`unclusteredPoint-${districtData.district}`}
        type="symbol"
        source={`${idPrefix}-${districtData.district}`}
        filter={['!=', 'has', 'point_count']}
        layout={{
          'icon-image': 'react',
          'icon-ignore-placement': true
        }}
      />
      {/* <Layer
        id={`unclusteredPoint-${districtData.district}`}
        type="circle"
        source={`${idPrefix}-${districtData.district}`}
        filter={['!=', 'has', 'point_count']}
        paint={{
          'circle-stroke-color': '#f77465',
          'circle-stroke-opacity': 0.5,
          'circle-stroke-width': 2,
          'circle-color': '#f75745',
          'circle-opacity': 0.8,
          'circle-radius': 5
        }}
      /> */}
      {children}
    </Source>
  )
}
