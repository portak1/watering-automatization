import { APIUserProvider } from '../API-providers/api-user-provider';
import { UserStorage } from './UserStorage';
export class UserManager {
  private userStorage = new UserStorage();
  private apiUserProvider = new APIUserProvider();

  login(userNumber: string): void {
    this.apiUserProvider
      .auth(userNumber)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
}
