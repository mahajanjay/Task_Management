import { Inject, Injectable, signal } from '@angular/core';
import { decodeJwt } from '../../shared/utils/helper';

interface LoggedInUser {
  id: number;
  email: string;
  name: string;
  roleId: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  loggedInUser = signal<LoggedInUser | null>(null);
  private parsedToken: any;

  setLoggedInUser(token: any) {
    this.parsedToken = decodeJwt(token);
    if(!this.parsedToken) {
      this.loggedInUser.set(null);
      return;
    }    

    const [ id, email, name, roleId ] = this.parsedToken['sub'];

    this.loggedInUser.set({
      id: parseInt(id),
      email: email,
      name: name,
      roleId: parseInt(roleId)
    });
  }

  getLoggedInUser(): LoggedInUser | null {
    return this.loggedInUser();
  }
}
