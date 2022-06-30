import { APIprovider } from './Request-service';

export class APISectionProvider {
  private apiProvider = new APIprovider();

  fetchSections(userID: number): Promise<Response> {
    var body = {
      user_id: userID,
    };
    return this.apiProvider.post('/sections', JSON.stringify(body));
  }
}
