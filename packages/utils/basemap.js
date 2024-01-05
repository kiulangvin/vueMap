import { epsg4490 } from './epsg'

import { getWidth, getTopLeft } from 'ol/extent'

import { Tile as TileLayer } from 'ol/layer'
import { WMTS } from 'ol/source'
import WMTSTileGrid from 'ol/tilegrid/WMTS'

export function basemap_tdt(type) {
  const tdtKey = 'fbaab7dca87a6ebf0bd1071ad5d837c0'
  const project = epsg4490()
  const projectionExtent = project.getExtent()
  const size = getWidth(projectionExtent) / 256 //size就是一个像素代表的经纬度
  const matrixIds = []
  const getResolutions = () => {
    let resolutions = []
    for (let z = 0; z < 20; ++z) {
      resolutions[z] = size / Math.pow(2, z)
      matrixIds[z] = z + ''
    }
    return resolutions
  }
  const createWmtsLayer = (url, layer) => {
    return new TileLayer({
      source: new WMTS({
        url: url,
        layer: layer,
        version: '1.0.0',
        style: 'default',
        matrixSet: 'c',
        format: 'tiles',
        wrapX: true,
        tileGrid: new WMTSTileGrid({
          origin: getTopLeft(projectionExtent),
          resolutions: getResolutions(),
          matrixIds: matrixIds
        })
      })
    })
  }
  let basemap = {
    // 矢量
    vec_c: [
      createWmtsLayer('http://t{0-7}.tianditu.gov.cn/vec_c/wmts?tk=' + tdtKey, 'vec'),
      createWmtsLayer('http://t{0-7}.tianditu.gov.cn/cva_c/wmts?tk=' + tdtKey, 'cva')
    ],
    // 影像
    img_c: [
      createWmtsLayer('http://t{0-7}.tianditu.gov.cn/img_c/wmts?tk=' + tdtKey, 'img'),
      createWmtsLayer('http://t{0-7}.tianditu.gov.cn/cia_c/wmts?tk=' + tdtKey, 'cia')
    ],
    // 地形
    ter_c: [
      createWmtsLayer('http://t{0-7}.tianditu.gov.cn/ter_c/wmts?tk=' + tdtKey, 'ter'),
      createWmtsLayer('http://t{0-7}.tianditu.gov.cn/cta_c/wmts?tk=' + tdtKey, 'cta')
    ]
  }
  if (basemap[type]) {
    return basemap[type]
  } else {
    return basemap['img_c']
  }
}
