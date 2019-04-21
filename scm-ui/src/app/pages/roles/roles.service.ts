import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../core/config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RolesService {
  constructor(private http: HttpClient) {
  }

  /**
   *  get all role
   * */
  getAll(): Observable<any> {    
    return this.http.get(`${config.baseApiURL}v1/roles/`);
  }

  /**
   *  get role by id 
   * */
  getById(id: string): Observable<any> {    
    return this.http.get(`${config.baseApiURL}v1/roles/${id}`);
  }

  /**
   *  add new role
   * */
  add(role: any): Observable<any> {    
    return this.http.post(`${config.baseApiURL}v1/roles/`, role);
  }

  /**
   *  Update role by id 
   * */
  update(role: any): Observable<any> {   
    return this.http.put(`${config.baseApiURL}v1/roles/${role.id}`, role);
  }

  /**
   *  delete role by id 
   * */
  delete(role: any): Observable<any> {    
    return this.http.delete(`${config.baseApiURL}v1/roles/${role.id}`);
  }
}