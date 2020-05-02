export default class EventInfo{
    #id;
    constructor(id, name, nameHash, date, limitations, description){
        this.#id = id;
        this.name = name;
        this.nameHash = nameHash;
        this.date = date;
        this.limitations = limitations;
        this.description = description;
    }
    get id(){
        return this.#id;
      }
}