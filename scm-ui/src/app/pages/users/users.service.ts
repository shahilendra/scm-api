import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../core/config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {
  }

  /**
   *  get all users
   * */
  getUsers(): Observable<any> {    
    return this.http.get(`${config.baseApiURL}v1/users/`);
  }

  /**
   *  get user by id 
   * */
  getByid(id: string): Observable<any> {    
    return this.http.get(`${config.baseApiURL}v1/users/${id}`);
  }

  /**
   *  add new user
   * */
  add(user: any): Observable<any> {    
    return this.http.post(`${config.baseApiURL}v1/users/`, user);
  }

  /**
   *  Update user by id 
   * */
  update(user: any): Observable<any> {    
    return this.http.put(`${config.baseApiURL}v1/users/${user.id}`, user);
  }

  /**
   *  delete user by id 
   * */
  delete(user: any): Observable<any> {    
    return this.http.delete(`${config.baseApiURL}v1/users/${user.id}`);
  }
}
