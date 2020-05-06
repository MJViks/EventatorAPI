export default (data, moduleName) =>{  
    //Response test
    if(data.rowsAffected)
    //Check for the number of responses
      if(data.rowsAffected[0] > 0)
      //Saving Product Name
        return true
      else
      //Error with a large number of answers or no answers
        throw new Error(moduleName + ' error. Data error. Object not found.')
    else
    //Server Error or Missing Responses
      throw new Error(moduleName + ' error. Database error or Object not found. Name: ' + data.name)
}