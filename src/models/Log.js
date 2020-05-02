export default class Log{
    #id;
    constructor(id, date, time, action, user_id){
        this.#id = id;
        this.time = time;
        this.action = action;
        this.date = date;
        this.user_id = user_id;
    }
    get id(){
        return this.#id;
      }
}