import type { MapRef } from 'react-map-gl'
export default function loadImage(map: MapRef, imgId: string, imgSrc: string) {
    if (!map.hasImage(imgId)) {
        const imgSize = 32
        const img = new Image(imgSize, imgSize)
        img.crossOrigin = 'Anonymous'
        img.onload = () => {
            map.addImage(imgId, img)
        }
        img.src = imgSrc
    }
}