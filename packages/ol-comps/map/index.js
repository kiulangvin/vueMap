import LMap from "./map.vue"

LMap.install = (app)=>{
    app.component(LMap.name, LMap)
}

export {LMap}
export default LMap; 