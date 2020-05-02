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