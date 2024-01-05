import { Projection, addProjection } from 'ol/proj'
import { register } from 'ol/proj/proj4'
import proj4 from 'proj4'

export function epsg4490() {
  if (proj4) {
    proj4.defs('EPSG:4490', '+proj=longlat +ellps=GRS80 +no_defs +type=crs')
    register(proj4)
    //重写projection4490，
    const my_projection = new Projection({
      code: 'EPSG:4490',
      units: 'degrees',
      axisOrientation: 'neu'
    })
    my_projection.setExtent([-180, -90, 180, 90])
    my_projection.setWorldExtent([-180, -90, 180, 90])
    addProjection(my_projection)
    return my_projection
  } else {
    throw new Error('4490坐标系需要引入lib中的proj4js')
  }
}
export function epsg3857() {}

export function epsg4526() {}
