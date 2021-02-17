
export const StatusCode = {
    Ok: 200,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,
    ServerError: 500,
};

// @ts-ignore
async function Post(url: string, body = null): Promise<Response> {
    const options = {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body != null ? JSON.stringify(body) : null,
    };
    return await fetch(url, options);
}

// @ts-ignore
async function Put(url: string, body = null): Promise<Response> {
    const options = {
        method: 'Put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body != null ? JSON.stringify(body) : null,
    };
    return await fetch(url, options);
}

class Request {
    url: string;
    method: string;
    headers: {};
    body: any;

    constructor(url, method) {
        this.url = url;
        this.method = method;
        this.headers = {};
    }

    static post(url: string): Request {
        return new Request(url, 'Post');
    }

    static put(url: string): Request {
        return new Request(url, 'Put');
    }

    static get(url: string): Request {
        return new Request(url, 'Get');
    }

    jsonBody(body: {}): Request {
        this.headers['Content-Type'] = 'application/json';
        this.body = JSON.stringify(body);
        return this;
    }

    multipartBody(body: FormData): Request {
        this.headers['Content-Type'] = 'multipart/form-data';
        this.body = body;
        return this;
    }

    bearerToken(token: string): Request {
        // @ts-ignore
        this.headers.Authorization = 'Bearer ' + token;
        return this;
    }

    header(key: string, value: string): Request {
        this.headers[key] = value;
        return this;
    }

    // @ts-ignore
    async call(): Promise<Response> {
        const options = {
            method: this.method,
            headers: this.headers,
            body: this.body,
        };

        // @ts-ignore
        return await fetchWithTimeout(this.url, options, 3000);
    }
}

async function fetchWithTimeout(url, options, timeout = 5000) {
    // @ts-ignore
    return Promise.race([
        fetch(url, options),
        // @ts-ignore
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        ),
    ]);
}
export default {
    Post,
    Put,
    Request,
};
