import DB from '../db'
import chResponse from '../db/chDbResponse'

export default class ProductGroup{
    #id;
    constructor(id, name, description, event_id){
        this.#id = id;
        this.name = name;
        this.event_id = event_id;
        this.description = description;
    }
    get id(){
        return this.#id;
      }
}

export const createProductGroup = async(name, event_id, description) =>{
        let data = await DB.insert('ProductGroup', ['name', 'event_id', 'description'], [name, event_id, description])
        if(chResponse(data, 'Create product group')){
            data = await DB.query(`SELECT ident_current('ProductGroup') as id`)
            if(chResponse(data, 'Create product group')){        
                data = data.recordset[0].id
                return data
            }
        }
  }
  
  export const deleteProductGroup = async(id_ProductGroup) =>{
        let data = await DB.delete('ProductGroup', id_ProductGroup)
        if(chResponse(data, 'Delete product group'))
            return true
  }
  
  export const updateProductGroup = async(id_ProductGroup, name, event_id, description) =>{
        let data = await DB.update('ProductGroup', id_ProductGroup, ['name', 'event_id', 'description'], [name, event_id, description])
        if(chResponse(data, 'Update product group')){
            data = data.recordset[0]
            return new ProductGroup(id_ProductGroup, name, event_id, description)
        }

  }

  export const getProductGroupById = async(idProductGroup) =>{
    let data =  await DB.query(`select id_ProductGroup, name, description, event_id from productGroup where id_ProductGroup = '${idProductGroup}' AND [ProductGroup].idDelete = '0'`)
    if(chResponse(data, 'Get productGroup')){
        data = data.recordset[0]
        return new ProductGroup(data.id_ProductGroup, data.name, data.description, data.event_id)
    }
}