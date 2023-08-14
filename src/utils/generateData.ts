import Tainan_Hotel_Data from 'data/tainan-hotel-data.json'
import { FeatureCollection, Feature } from 'geojson'

export interface CustomGeoJsonType {
    [x: string]: FeatureCollection & {
        district: string
    }
}

const DISTRICT_MAPPING: { [x: string]: string } = {
    jiali: "佳里",
    baihe: "白河",
    anping: "安平",
    anding: "安定",
    annan: "安南",
    yongkang: "永康",
    east: "東區",
    south: "南區",
    north: "北區",
    xinying: "新營",
    rende: "仁德",
    danei: "大內",
    westCentral: "中西",
    sinying: "新營",
    yanshuei: "鹽水",
    liouying: "柳營",
    houbi: "後壁",
    dongshan: "東山",
    madou: "麻豆",
    siaying: "下營",
    lioujia: "六甲",
    guantian: "官田",
    syuejia: "學甲",
    nansi: "楠西",
    shanhua: "善化",
    sinhua: "新化",
    sigang: "西港",
    guanmiao: "關廟",
    yujing: "玉井",
    sinshih: "新市",
    gueiren: "歸仁",
    beimen: "北門",
    nanhua: "南化",
    cigu: "七股",
    zuojhen: "左鎮",
    longci: "龍崎",
    jiangjyun: "將軍",
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
                introduction
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
    return result
}

export default generateData