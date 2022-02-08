import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  baseUrl = 'https://routeegypt.herokuapp.com/';

  constructor(private _HttpClient:HttpClient) { }

  
  getUserNotes(userData:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}getUserNotes`,userData)
  }

  addNote(userData:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}addNote`,userData)
  }
  
  deleteNote(SpecificNoteData:object):Observable<any>{

    return this._HttpClient.delete(`${this.baseUrl}deleteNote`,SpecificNoteData)
  }

  updateNote(SpecificNoteData:object):Observable<any>{

    return this._HttpClient.put(`${this.baseUrl}updateNote`,SpecificNoteData)
  }
}
