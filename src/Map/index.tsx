import { useState, useEffect } from 'react'
import { Layer } from 'react-map-gl'
import CustomMap from './CustomMap'
// import { DistrictMRTdataType } from 'data/KH-MART'
import CustomSource from './CustomSource'
import { CustomGeoJsonType } from 'utils/generateData'

function MapBox({
  dataset,
  iconData,
  defaultZoom
}: {
  dataset: CustomGeoJsonType
  iconData: { [iconId: string]: string }
  defaultZoom?: number
}) {
  const DEFAULT_ZOOM_IN = defaultZoom || 9
  const [layerIds, setLayerId] = useState<string[] | undefined>(undefined)

  useEffect(() => {
    const layerNames = Object.keys(dataset).flatMap((keyName) => [
      `clusters-${keyName}`,
      `unclusteredPoint-${keyName}`
    ])
    setLayerId(layerNames)
  }, [dataset])

  return (
    <>
      <CustomMap
        iconData={iconData}
        interactiveLayerIds={layerIds}
        defaultZoom={DEFAULT_ZOOM_IN}
      >
        {Object.keys(dataset).map((districtName) => (
          <CustomSource
            key={districtName}
            sourceId={`hotel-${districtName}`}
            districtName={districtName}
            districtData={dataset[districtName]}
            defaultZoom={DEFAULT_ZOOM_IN + 1}
            clusterProperties={{
              isOnePointCluster: [
                'any',
                ['==', ['get', 'isOnePointCluster'], true]
              ]
            }}
          >
            <Layer
              id={`clusters-${districtName}`}
              type="circle"
              source={`hotel-${districtName}`}
              filter={['has', 'point_count']}
              paint={{
                'circle-stroke-color': '#f77465',
                'circle-stroke-opacity': 0.5,
                'circle-stroke-width': 15,
                'circle-color': '#f75745',
                'circle-opacity': 0.8,
                'circle-radius': 45
              }}
            />
            <Layer
              id={`clusterCount-${districtName}`}
              type="symbol"
              source={`hotel-${districtName}`}
              filter={['has', 'point_count']}
              paint={{
                'text-color': 'white'
              }}
              layout={{
                'text-field': [
                  'format',
                  dataset[districtName].district,
                  { 'font-scale': 1.3 },
                  '\n',
                  {},
                  [
                    'concat',
                    '總數: ',
                    [
                      'case',
                      ['==', ['get', 'isOnePointCluster'], true],
                      1,
                      ['get', 'point_count']
                    ]
                  ],
                  { 'font-scale': 1.1 }
                ],
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 15,
                'text-allow-overlap': true
              }}
            />
          </CustomSource>
        ))}
      </CustomMap>
    </>
  )
}

export default MapBox
