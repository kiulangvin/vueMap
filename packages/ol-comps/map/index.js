import LMap from './Map.vue'

LMap.install = (app) => {
  app.component(LMap.name, LMap)
}

export { LMap }
export default LMap
