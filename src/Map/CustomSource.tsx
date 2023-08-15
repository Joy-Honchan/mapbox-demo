import { FeatureCollection } from 'geojson'
import { Source, SourceProps, Layer } from 'react-map-gl'

interface CustomSourceType extends Omit<SourceProps, 'type' | 'data' | 'id'> {
  sourceId: string
  districtData: FeatureCollection
  districtName: string
  clusterProperties?: object
  defaultZoom: number
}

export default function CustomSource({
  sourceId,
  districtData,
  districtName,
  children,
  clusterProperties,
  defaultZoom,
  ...rest
}: CustomSourceType) {
  return (
    <Source
      id={sourceId}
      type="geojson"
      data={districtData}
      cluster={true}
      clusterMaxZoom={defaultZoom + 1}
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
