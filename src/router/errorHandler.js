export default (ctx, err) => {
	//We indicate the status of the response
	ctx.status = err.statusCode || err.status || 500
	//Specify the response body
	ctx.body = {
		status: ctx.status,
		success: 'error',
		message: err.message
	}  

}