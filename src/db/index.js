import sql from 'mssql';
// Config connection to the melon database
import * as config from '../../appConfig.json';
import env from 'dotenv'
env.config();
const connectPool = {
  "user": "sa",
  "password": "72F9EE388378F09B48F62CCBFFECA7D350196308A390654B74FAE5465951C185",
  "server": process.env.MSSQL_HOST,
  "database": "EventatorAPIv1",
  "options": {
    "encrypt": true,
    "enableArithAbort": true
}}

export default class DB {

    static #pool = new sql.ConnectionPool(connectPool);
    static #connect = this.#pool.connect()
    // The basic function of the request template. Based on this function, all queries are built
    // input:
    // text: string
    static query = async (text) => {
      try {
        // await this.#pool.connect()
        // Create a request
        const req = this.#pool.request();

        // We call the method of the request object with the given text. Waiting for an answer. We get the answer and write it down.
        const res = await req.query(text);

        // We return the result of the request
        return res;
      } catch (err) {
        // Return the error text
        return err;
      } finally {
        // Close the database connection
        // this.#pool.close()
      }
    }


    // Setting quotes for String
    // input:
    // arr: arr[string]
    static #setQuote = (arr) => arr.map((val) => {
      if (val === null) return 'null'
      if (typeof val === 'string') return `'${val}'`;
      return val;
    })

    // function insert based on DB.query
    // input:
    // table: string, fild: arr[string], value: arr[string]
    static insert = async (table, fild, value) => {
      value = this.#setQuote(value);
      
      if (fild.length === value.length) { return DB.query(`INSERT INTO [${table}] (${fild}) VALUES (${value})`); }
      return 'Arrays are not equal';
    }

    // function delete based on DB.query
    // input:
    // table: string, id: int

    static delete = async (table, id) => {
      let isDelete = await DB.query(`select isDelete from ${table} where id${table} = ${id}`)
        if(isDelete.recordset[0].isDelete)
          throw new Error('No table exists.')
      return await DB.query(`UPDATE [${table}] SET isDelete = '1' WHERE id${table} = ${id} AND isDelete = '0'`)
    }
     // function updete based on DB.query
     // input:
     // table: string, id: int, fild: arr[string], value: arr[string]
     static update = async (table, id, fild, value) => {
       value = this.#setQuote(value);

       let isDelete = await DB.query(`select isDelete from ${table} where id${table} = ${id}`)
        if(isDelete.recordset[0].isDelete)
          throw new Error('No table exists.')
       if (fild.length === value.length) {
         const approp = fild.map((val, i) => `${val} = ${value[i]}`);
         return await DB.query(`UPDATE [${table}] SET ${approp} WHERE id${table} = ${id} AND isDelete = '0'`);

       }
       return 'Arrays are not equal';
     }

     // function select based on DB.query
     // input:
     // table: string, count: int
     static selectAll = async (table, count) => DB.query(`SELECT top ${count}* from ${table}`)

     // input:
     // table: string, id: int, count: int
     static selectAllById = async (table, id, count) => DB.query(`select top ${count} * from ${table} where id_${table} = ${id}`)

     // select specific columns from a table
     // input:
     // table: string, id: int, fild: arr[string], count: int
     static selectFlex = async (table, fild, count) => DB.query(`select top ${count} ${fild} from ${table}`)

     // Selecting 'count' rows from the 'field' columns of the table 'table',
     // where 'condFild' is equal to 'condValue'.
     // input:
     // table: string, id: int, fild: arr[string], condFild:string, condValue: var, count: int
     static selectFlexСond = async (table, fild, condFild, condValue, count) => DB.query(`select top ${count} ${fild} from ${table} where ${condFild} = '${condValue}'`)
}
