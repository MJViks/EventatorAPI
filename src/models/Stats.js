import DB from '../db'
import chResponse from '../db/chDbResponse'

export default class Stats{
	constructor(productGroupName, productCount, productPrice){
		this.productGroupName = productGroupName
		this.productCount = productCount
		this.productPrice = productPrice
	}
}

//Getting statistics on product groups
//idProductGroup, eventId: integer
export const getStatsByProductGroup = async(idProductGroup, eventId) =>{       
	let data =  await DB.query(`select [ProductGroup].[name]  as 'productGroupName', sum([Product].[count]) as 'productCount', 
    sum([Product].[price] * [Product].[count]) as 'productPrice' from Product 
    join ProductGroup on idProductGroup = ProductGroupID
    join Event on idEvent = eventId
    where eventId = '${eventId}' and ProductGroupId = '${idProductGroup}'
    group by [ProductGroup].[name] order by [productPrice] desc`)
	if(chResponse(data, 'Get stats By Product Group')){ 
		data = data.recordset[0]
		return new Stats(data.productGroupName, data.productCount, data.productPrice)
	}
}
//Getting statistics on all costs in the event
//eventId: integer
export const getStatsByEvent = async(eventId) =>{       
	let data =  await DB.query(`select [ProductGroup].[name]  as 'productGroupName', sum([Product].[count]) as 'productCount', 
    sum([Product].[price] * [Product].[count]) as 'productPrice' from Product 
    join ProductGroup on idProductGroup = ProductGroupID
    join Event on idEvent = '${eventId}'
    where eventId = 1
    group by [ProductGroup].[name] order by [productPrice] desc`)
	if(chResponse(data, 'Get stats By Product Group')){ 
		let answer = {}
        
		data.recordset.forEach((element, i) => {
			answer[i] = element
            
		})
		return answer
	}
}

//Obtaining statistics on costs per person for a given amount of investors
//userCount, eventId: integer
export const getStatsByUsers = async(userCount, eventId) =>{       
	let data =  await DB.query(`select sum([Product].[price] * [Product].[count]) / '${userCount}' as 'price', '${userCount}' as 'userCount' from Product 
    join ProductGroup on idProductGroup = ProductGroupID
    join Event on idEvent = '${eventId}'
    order by [price] desc`)
	if(chResponse(data, 'Get stats By Product Group')){ 
		let answer = data.recordset[0]
		return answer
	}
}