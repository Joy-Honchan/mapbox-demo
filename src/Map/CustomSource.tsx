import { FeatureCollection } from 'geojson'
import { Source, SourceProps, Layer } from 'react-map-gl'

// interface CustomSourceType extends Omit<SourceProps, 'type' | 'data' | 'id'> {
//   prefix?: string
//   districtData: FeatureCollection
//   districtName: string
// }
interface CustomSourceType extends Omit<SourceProps, 'type' | 'data' | 'id'> {
  sourceId: string
  districtData: FeatureCollection
  districtName: string
  clusterProperties?: object
}

export default function CustomSource({
  sourceId,
  districtData,
  districtName,
  children,
  clusterProperties,
  ...rest
}: CustomSourceType) {
  return (
    <Source
      id={sourceId}
      type="geojson"
      data={districtData}
      cluster={true}
      clusterMaxZoom={15}
      clusterRadius={512}
      clusterProperties={clusterProperties}
      {...rest}
    >
      <Layer
        id={`unclusteredPoint-${districtName}`}
        type="symbol"
        source={sourceId}
        filter={['has', 'id']}
        layout={{
          'icon-image': 'react',
          'icon-ignore-placement': true
        }}
      />
      {children}
    </Source>
  )
}
