import { UserStorage } from '../local-providers/UserStorage';
import { environment } from '../../enviroments/enviroment';
export class APIprovider {
  private usermanager: UserStorage = new UserStorage();

  async post(url: string, searchData?: string): Promise<Response> {
    if (this.usermanager?.getUsertoken()) {
      return fetch(environment.API_ENDPOINT + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + this.usermanager.getUsertoken(),
        },
        body: searchData,
      });
    } else {
      return fetch(environment.API_ENDPOINT + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: searchData,
      });
    }
  }
}
