import { Headers } from '../interfaces';

export class APIprovider {
  constructor() {}

  async post(
    url: string,
    httpSettings: Headers,
    data?: object
  ): Promise<Response> {
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: httpSettings.Token,
      },
    });
  }
}
