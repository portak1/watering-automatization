import { APIUserProvider } from '../API-providers/api-user-provider';
import { UserStorage } from './UserStorage';
export class UserManager {
  private userStorage = new UserStorage();
  private apiUserProvider = new APIUserProvider();

  async login(userNumber: string): Promise<boolean> {
    let loginResult: boolean = false;

    await this.apiUserProvider
      .auth(userNumber)
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          this.userStorage.setUserId(data.user.id);
          this.userStorage.setUserName(data.user.name);
          this.userStorage.setUserNumber(data.user.user_number);

          this.userStorage.setUserToken(data.token);
          loginResult = true;
        } else {
          loginResult = false;
        }
      });
    return loginResult;
  }
  logout(): void {
    this.userStorage.clearUserStorage();
  }
}
