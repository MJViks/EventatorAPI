export default class Event{
    #id;
    #codeHash;
    #adminPassHash;
    #editPassHash;
    constructor(id, adminPassHash, eventInfo_ID, editPassHash, code, codeHash){
        this.#id = id;
        Object.defineProperty(this, "code", {
            writable: false,
            value: code,
            enumerable: true
          });
        this.#codeHash = codeHash;
        this.#adminPassHash = adminPassHash;
        this.eventInfo_ID = eventInfo_ID;
        this.#editPassHash = editPassHash
    }
    /* 
    This lineup is necessary to separate the validation of input data 
    and restrict access to fields from the object overview
    */
   
    //Private field getters
    get id(){
      return this.#id;
    }

    get codeHash(){
      return this.#codeHash;
    }

    get adminPassHash(){
      return this.#adminPassHash;
    }

    get editPassHash(){
      return this.#editPassHash;
    }

    //Private field setters
    set codeHash(value){
      this.#codeHash = value;
    }

    set adminPassHash(value){
      this.#adminPassHash = value;
    }

    set editPassHash(value){
      this.#editPassHash = value;
    }


}