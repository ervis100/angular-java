import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../general/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  usersChanged = new Subject<User[]>();
  private users: User[] = [];

  // url = 'http://localhost:8000/user';
  url = 'https://jsonplaceholder.typicode.com/users';
  storeUser(user: User) {
    this.http.post<User[]>(this.url, user)
  }

  fetchUsers() {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
  }

}
