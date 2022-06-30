import { APIprovider } from './Request-service';

export class APIUserProvider {
  private apiProvider = new APIprovider();

  auth(userNumber: string): Promise<Response> {
    var body = {
      user_number: userNumber,
    };

    return this.apiProvider.post(
      '/login',
      JSON.stringify(body)
    );
  }
}
