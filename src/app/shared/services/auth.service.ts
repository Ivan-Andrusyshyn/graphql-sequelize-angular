import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthArgs, User } from '../models/user.model';
import { GET_ALL_USERS, LOGIN_USER, REGISTER_USER } from '../apollo/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuth = new BehaviorSubject(false);
  isAuth$ = this.isAuth.asObservable();

  constructor(private apollo: Apollo) {}

  onIsAuthUser() {
    this.isAuth.next(true);
  }
  registration(input: AuthArgs): Observable<any> {
    return this.apollo.mutate<{ registration: User }>({
      mutation: REGISTER_USER,
      variables: {
        input,
      },
    });
  }
  login(input: AuthArgs): Observable<any> {
    return this.apollo.mutate<{ login: User }>({
      mutation: LOGIN_USER,
      variables: {
        input,
      },
    });
  }

  getAllUsers(): Observable<any> {
    return this.apollo.watchQuery<{ getAllUsers: User[] }>({
      query: GET_ALL_USERS,
    }).valueChanges;
  }

  logout() {
    localStorage.removeItem('user');
    this.isAuth.next(false);
  }
}
