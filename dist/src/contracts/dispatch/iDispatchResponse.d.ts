export interface iDispatchResponse<Body, Headers> {
    url: string;
    userAgent: string;
    headers: Headers;
    body: Body;
}
