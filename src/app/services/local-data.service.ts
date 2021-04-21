/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  public noticiasFav: Article[] = [];

  constructor(private storage: Storage) {
    this.cargarFavoritos();
  }


  public guardarNoticia(noticia: Article) {
    const repe = this.noticiasFav.find(not => not.title === noticia.title);
    if (!repe) {
      this.noticiasFav.unshift(noticia); // unshift coloca el elemento al principio del array
      this.storage.set('favoritos', this.noticiasFav);
    } else {
      console.log('noticia repetica, no se guarda');
    }

  }

  public async cargarFavoritos() {
    const favs = await this.storage.get('favoritos');
    if (favs) {
      this.noticiasFav = favs;
    }
  }

  public borrarNoticia(noticia: Article) {
    this.noticiasFav = this.noticiasFav.filter(noti => noti.title !== noticia.title); // filtramos y aceptamos todas las que NO coinciden con el titulo de la noticia, que es lo que retorna
  }

}
