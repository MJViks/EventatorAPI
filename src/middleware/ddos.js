//Ddos Attack Prevention Module

import Ddos from 'ddos'
const ddos = new Ddos()
export default ddos.koa().bind(ddos)