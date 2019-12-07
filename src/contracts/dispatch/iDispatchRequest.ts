export interface iDispatchRequest<Body, Headers> {
    url: string,
    userAgent: string,
    headers: Headers
    body: Body,
}

