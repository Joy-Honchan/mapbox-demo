import Tainan_Hotel_Data from 'data/tainan-hotel-data.json'
import { FeatureCollection, Feature } from 'geojson'

export interface CustomGeoJsonType {
    [x: string]: FeatureCollection & {
        district: string
    }
}

const DISTRICT_MAPPING: { [x: string]: string } = {
    jiali: "佳里區",
    baihe: "白河區",
    anping: "安平區",
    anding: "安定區",
    annan: "安南區",
    yongkang: "永康區",
    east: "東區",
    south: "南區",
    north: "北區",
    xinying: "新營區",
    rende: "仁德區",
    danei: "大內區",
    westCentral: "中西區",
    sinying: "新營區",
    yanshuei: "鹽水區",
    liouying: "柳營區",
    houbi: "後壁區",
    dongshan: "東山區",
    madou: "麻豆區",
    siaying: "下營區",
    lioujia: "六甲區",
    guantian: "官田區",
    syuejia: "學甲區",
    nansi: "楠西區",
    shanhua: "善化區",
    sinhua: "新化區",
    sigang: "西港區",
    guanmiao: "關廟區",
    yujing: "玉井區",
    sinshih: "新市區",
    gueiren: "歸仁區",
    beimen: "北門區",
    nanhua: "南化區",
    cigu: "七股區",
    zuojhen: "左鎮區",
    longci: "龍崎區",
    jiangjyun: "將軍區",
    unknown: "未分類"
}

const generateData: () => CustomGeoJsonType = () => {
    let result = {} as CustomGeoJsonType
    for (const data of Tainan_Hotel_Data) {
        const { id, name, address, lat, long, category, introduction } = data;
        const nowItem: Feature = {
            type: 'Feature',
            properties: {
                id,
                name,
                address,
                category,
                introduction,
            },
            geometry: {
                coordinates: [Number(long), Number(lat)],
                type: 'Point'
            }
        }
        const enkey =
            Object.keys(DISTRICT_MAPPING).find(
                (key) => address.includes(DISTRICT_MAPPING[key])
            ) || 'unknown'
        const districtKey = Object.keys(result).find((item) => item === enkey)
        if (districtKey && result[districtKey]) {
            const newFeatures = [...result[districtKey].features, nowItem]
            const copyCollection = { ...result[districtKey] }
            result = {
                ...result,
                [districtKey]: { ...copyCollection, features: newFeatures }
            }
        } else {
            result = {
                ...result,
                [enkey]: {
                    type: 'FeatureCollection',
                    district: DISTRICT_MAPPING[enkey],
                    features: [nowItem]
                }
            }
        }
    }
    for (const item of Object.keys(result)) {
        if (result[item].features.length !== 1) continue;
        const { type, geometry } = result[item].features[0]
        const oneClusterPoint = {
            type,
            properties: {
                isOnePointCluster: true
            },
            geometry
        }
        result[item].features = [...result[item].features, oneClusterPoint]
    }
    return result
}

export default generateData