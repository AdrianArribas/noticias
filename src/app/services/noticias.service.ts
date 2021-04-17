/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';


const apikey = environment.apikey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apikey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {




  constructor(private http: HttpClient) { }

  public getTopHeadlines() {
    return this.setQuery<RespuestaTopHeadLines>('/top-headlines?country=us&category=business');
  }

  public getNewsByCategory(category: string) {
    return this.setQuery<RespuestaTopHeadLines>('/top-headlines?country=us&category=' + category);
  }

  private setQuery<T>(slug: string) {  // poniendo la <T> en el tipado de respuesta se deja la respuesta como generica para que el que llama al metodo la establezca
    const query = apiUrl + slug;
    return this.http.get<T>(query, { headers });
  }
}
