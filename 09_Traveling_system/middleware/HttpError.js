class HttpError extends Error{
    constructor(message,statuCode){
        super(message)
        this.statuCode = statuCode
    }
}

export default HttpError