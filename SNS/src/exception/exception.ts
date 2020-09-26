class HTTPError extends Error {
    constructor(statusCode: number, message?: string) {
        super(message)
        this.name = `HTTPError`
        this["statusCode"] = statusCode
    }
}

export = HTTPError;