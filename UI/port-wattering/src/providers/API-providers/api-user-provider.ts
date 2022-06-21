import { APIprovider } from './Request-service';

export class APIUserProvider {
  private apiProvider = new APIprovider();

  auth(userNumber: string): Promise<Response> {
    var body = {
      user_number: userNumber,
    };

    return this.apiProvider.post(
      'http://localhost:5000/watering-api/login',
      JSON.stringify(body)
    );
  }
}
