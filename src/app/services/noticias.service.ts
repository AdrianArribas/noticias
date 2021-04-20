/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadLines, MediaStackObj } from '../interfaces/interfaces';


const apikey = environment.apikey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apikey
});

const apikeyMS = environment.apikeyMS;
const apiUrlMS = environment.apiUrlMS;

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {


  constructor(private http: HttpClient) { }

  public getTopHeadlines(page) {
    console.log(page);
    console.log('query:', '/top-headlines?country=us&category=business' + '&page=' + page + '');
    return this.setQuery<RespuestaTopHeadLines>('/top-headlines?country=us&category=business' + '&page=' + page);
  }

  public getNewsByCategory(category: string, page: number) {
    return this.setQuery<RespuestaTopHeadLines>('/top-headlines?country=us&category=' + category + '&page=' + page);
  }

  private setQuery<T>(slug: string) {  // poniendo la <T> en el tipado de respuesta se deja la respuesta como generica para que el que llama al metodo la establezca
    const query = apiUrl + slug;
    return this.http.get<T>(query, { headers });
  }

  // ################ MEDIASTACK OPTION ##########################

  public getTopHeadLinesMS(offset: number, slug?: string) {
    return this.setQueryMS<MediaStackObj>(offset);
  }

  public setQueryMS<T>(offset: number, slug?: string) {
    let query;
    if (slug !== undefined && slug !== '') {
      query = apiUrlMS + apikeyMS + slug + '&languages=es&limit=20&offset=' + offset; //'&languages=es&limit=20&offset='
    } else {
      query = apiUrlMS + apikeyMS + '&limit=20&offset=' + offset + '&languages=en,es';
    }
    return this.http.get<T>(query);
  }
}
