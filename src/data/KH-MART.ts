import { FeatureCollection } from 'geojson'

export type DistrictMRTdataType = FeatureCollection & { district: string }

export const KH_DISTRICT_MAPPING = {
    xiaogang: '小港',
    zuoying: "左營",
    cianjhen: "前鎮",
    cianjin: "前金"
}

export const KH_MRT_DATA: DistrictMRTdataType[] = [
    {
        district: 'xiaogang',
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    stationId: 'R3',
                    name: '小港'
                },
                geometry: {
                    coordinates: [120.3539886937292, 22.56444873202568],
                    type: 'Point'
                }
            },
            {
                type: 'Feature',
                properties: {
                    stationId: 'R4',
                    name: '高雄國際機場'
                },
                geometry: {
                    coordinates: [120.34274277484167, 22.570087308244965],
                    type: 'Point'
                }
            }
        ]
    },
    {
        district: 'zuoying',
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    stationId: 'R14',
                    name: '巨蛋'
                },
                geometry: {
                    coordinates: [120.3032498977372, 22.665859522113706],
                    type: 'Point'
                }
            },
            {
                type: 'Feature',
                properties: {
                    stationId: 'R15',
                    name: '生態園區'
                },
                geometry: {
                    coordinates: [120.30635144603565, 22.676381210961907],
                    type: 'Point'
                }
            }
        ]
    },
    {
        district: 'cianjhen',
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    stationId: 'R8/Y14',
                    name: '三多商圈'
                },
                geometry: {
                    coordinates: [120.30448644511353, 22.613805386136463],
                    type: 'Point'
                }
            }
        ]
    },
    {
        district: 'cianjin',
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    stationId: 'R9',
                    name: '中央公園'
                },
                geometry: {
                    coordinates: [120.30101458879193, 22.6249012767109],
                    type: 'Point'
                }
            }
        ]
    }
]
