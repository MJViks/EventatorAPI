export default class ProductGroup{
    #id;
    constructor(id, name, event_id){
        this.#id = id;
        this.name = name;
        this.event_id = event_id;
    }
    get id(){
        return this.#id;
      }
}