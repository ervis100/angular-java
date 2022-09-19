import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../general/User';
import { tap,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  usersChanged = new Subject<User[]>();

  url = 'http://localhost:8080/api/user';

  storeUser(user) {
   return this.http.post(this.url, user)
  }

  fetchUsers(pageNo , pageSize) {
    return this.http.get<any>('http://localhost:8080/api/user' , {
      params: new HttpParams().set('pageNo' , pageNo).set('pageSize' , pageSize)
    }).pipe( map(result => {
      let tableData = {
        'pageNo' : result.pageNo,
        'pageSize' : result.pageSize,
        'totalElements' : result.totalElements,
        'totalPages' : result.totalPages,
        'users' : []
      }  
        result.content = result.content.map(user => {
          let created =  new Date(
            user.createdAt[0],
            user.createdAt[1],
            user.createdAt[2],
            user.createdAt[3],
            user.createdAt[4],
            user.createdAt[5]
          );

         return new User(user.id , user.name , user.username , user.email , created);
        })
        tableData.users = result.content;
        return tableData;
      })
    )
  }

  updateUser(id , user) {
    return this.http.put('http://localhost:8080/api/user/'+id, user)
  }

}