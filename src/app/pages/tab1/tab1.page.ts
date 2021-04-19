/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article, RespuestaTopHeadLines } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public obs: Observable<any>;
  public noticias: Article[] = [];
  public pagina: number;

  constructor(private nociticasService: NoticiasService) {
    this.pagina = 1;
  }

  ngOnInit() {
    this.cargarNoticias();
    // this.obs = this.nociticasService.getTopHeadlines();
  }


  public loadData(event) {
    console.log('scroll');
    this.cargarNoticias(event);
  }

  public cargarNoticias(event?) {
    const p = this.pagina;
    this.nociticasService.getTopHeadlines(p).subscribe((res: RespuestaTopHeadLines) => {
      // console.log('res:', res);

      if (res.articles.length === 0 && event) {
        console.log('cancelando Infinite');
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.noticias.push(...res.articles); //ver notas
      this.pagina++;
      if (event) {
        console.log(event);
        event.target.complete();
      }
      // console.log('noticias: ', this.noticias);
    });
  }

}
