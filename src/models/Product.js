export default class Product{
    #id;
    constructor(id, name, price, count, description, buy){
        this.#id = id;
        this.name = name;
        this.price = price;
        this.count = count;
        this.description = description;
        this.buy = buy;
    }
    get id(){
        return this.#id;
      }
}