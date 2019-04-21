import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../core/config';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class OrganisationsService {

  constructor(private http: HttpClient) {
  }

  /**
   *  get all Organisations
   * */
  getAll(): Observable<any> {    
    return this.http.get(`${config.baseApiURL}v1/organisations/`);
  }

  /**
   *  get user by id 
   * */
  getById(id: string): Observable<any> {    
    return this.http.get(`${config.baseApiURL}v1/organisations/${id}`);
  }

  /**
   *  add new user
   * */
  add(organisation: any): Observable<any> {    
    return this.http.post(`${config.baseApiURL}v1/organisations/`, organisation);
  }

  /**
   *  Update organisation by id 
   * */
  update(organisation: any): Observable<any> {    
    return this.http.put(`${config.baseApiURL}v1/organisations/${organisation.id}`, organisation);
  }

  /**
   *  delete organisation by id 
   * */
  delete(organisation: any): Observable<any> {    
    return this.http.delete(`${config.baseApiURL}v1/organisations/${organisation.id}`);
  }

}
