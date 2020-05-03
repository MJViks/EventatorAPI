import DB from './db/db'
 DB.selectAll('EventInfo', 2).then(data => console.log(data))

// console.log(process.env.ID test)