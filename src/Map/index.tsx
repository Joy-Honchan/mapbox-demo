import CustomMap from './CustomMap'
import { DistrictMRTdataType } from 'data/KH-MART'
import CustomSource from './CustomSource'

function MapBox({
  dataset,
  iconData
}: {
  dataset: DistrictMRTdataType[]
  iconData: { [iconId: string]: string }
}) {
  return (
    <>
      <CustomMap iconData={iconData}>
        {dataset.map((districtData) => (
          <CustomSource
            key={districtData.district}
            districtData={districtData}
          ></CustomSource>
        ))}
      </CustomMap>
    </>
  )
}

export default MapBox
