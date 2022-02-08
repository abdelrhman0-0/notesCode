import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://routeegypt.herokuapp.com/';

  constructor(public _HttpClient:HttpClient) { }


  register(formData:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}signup`,formData)
  }

  login(formData:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}signin`,formData)
  }

  logout(token= localStorage.getItem('token')):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}signOut`,token)
  }

  isLoggedin(){
    return !!localStorage.getItem('token');
  }

}
