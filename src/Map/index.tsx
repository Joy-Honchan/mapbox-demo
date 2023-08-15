import { Layer } from 'react-map-gl'
import CustomMap from './CustomMap'
// import { DistrictMRTdataType } from 'data/KH-MART'
import CustomSource from './CustomSource'
import { CustomGeoJsonType } from 'utils/generateData'

function MapBox({
  dataset,
  iconData
}: {
  dataset: CustomGeoJsonType
  iconData: { [iconId: string]: string }
}) {
  return (
    <>
      <CustomMap iconData={iconData}>
        {Object.keys(dataset).map((districtName) => (
          <CustomSource
            key={districtName}
            sourceId={`hotel-${districtName}`}
            districtName={districtName}
            districtData={dataset[districtName]}
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
