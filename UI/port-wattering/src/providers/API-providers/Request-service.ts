import { UserStorage } from '../local-providers/UserStorage';
export class APIprovider {
  private usermanager: UserStorage = new UserStorage();

  async post(url: string, searchData?: string): Promise<Response> {
    if (this.usermanager?.getUsertoken()) {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer' + this.usermanager.getUsertoken(),
        },
        body: searchData,
      });
    } else {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: searchData,
      });
    }
  }


}
