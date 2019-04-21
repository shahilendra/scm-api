import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../core/config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenusService {
  constructor(private http: HttpClient) {
  }

  /**
   *  get all menus
   * */
  getAll(): Observable<any> {    
    return this.http.get(`${config.baseApiURL}v1/menus/`);
  }

  /**
   *  get menu by id 
   * */
  getById(id: string): Observable<any> {    
    return this.http.get(`${config.baseApiURL}v1/menus/${id}`);
  }

  /**
   *  add new menu
   * */
  add(menu: any): Observable<any> {    
    return this.http.post(`${config.baseApiURL}v1/menus/`, menu);
  }

  /**
   *  Update menu by id 
   * */
  update(menu: any): Observable<any> {    
    return this.http.put(`${config.baseApiURL}v1/menus/${menu.id}`, menu);
  }

  /**
   *  delete menu by id 
   * */
  delete(menu: any): Observable<any> {    
    return this.http.delete(`${config.baseApiURL}v1/menus/${menu.id}`);
  }

  getParentsMenus(): Observable<any> {    
    return this.http.get(`${config.baseApiURL}v1/auth/me-parents-menus`);
  }
}