class HttpError extends Error{
    constructor(StatusCode,message){
        super(message)

        this.StatusCode = StatusCode
    }
}

export default HttpError