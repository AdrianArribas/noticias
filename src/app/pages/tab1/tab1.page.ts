/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article, RespuestaTopHeadLines, MediaStackObj, Source } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public obs: Observable<any>;
  public noticias: Article[] = [];
  public noticiasBuffer: Article[] = [];
  public pagina: number;
  public offset: number;
  public noticiasMS: MediaStackObj;
  public activeSegment: string;

  constructor(private nociticasService: NoticiasService) {
    this.pagina = 1;
    this.offset = 0;
    this.activeSegment = 'NewsApi';
  }

  ngOnInit() {
    this.cargarNoticias();
    // this.obs = this.nociticasService.getTopHeadlines();
    this.nociticasService.setQueryMS(this.offset).subscribe((res: MediaStackObj) => {
      this.noticiasMS = res;
      // console.log('mediaStack: ', this.noticiasMS.data);
    });
    this.offset += 20;
  }

  public segmentChanged(ev) {
    // console.log(ev.detail.value);
    this.activeSegment = ev.detail.value;
    this.noticias = [];
    if (ev.detail.value === 'MediaStack') {

      this.convertirNews();

    } else {
      this.noticias = this.noticiasBuffer;
    }

  }

  public loadData(event) {
    this.cargarNoticias(event);
  }

  public cargarNoticias(event?) {

    if (this.activeSegment === 'MediaStack') {
      this.nociticasService.setQueryMS(this.offset).subscribe((res: MediaStackObj) => {
        for (const item of res.data) {
          this.noticiasMS.data.push(item);
        }
        this.convertirNews();
        this.offset += 20;
        if (event) {
          console.log(event);
          event.target.complete();
        }
      }), (err => {
        console.log('error', err);
      });

    } else {
      const p = this.pagina;
      this.nociticasService.getTopHeadlines(p).subscribe((res: RespuestaTopHeadLines) => {
        // console.log('res:', res);

        if (res.articles.length === 0 && event) {
          // console.log('cancelando Infinite');
          event.target.disabled = true;
          event.target.complete();
          return;
        }

        this.noticias.push(...res.articles); //ver notas
        this.noticiasBuffer.push(...res.articles);
        this.pagina++;
        if (event) {
          console.log(event);
          event.target.complete();
        }
        // console.log('noticias: ', this.noticias);
      }), (err => {
        console.log('error', err);
      });

    }

  }

  private convertirNews() {
    this.noticias = [];
    this.noticiasMS.data.forEach(el => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const not: Article = {
        author: el.author,
        content: '',
        description: el.description,
        publishedAt: el.publishedAt,
        source: { id: '', name: el.source },
        title: el.title,
        url: el.url,
        urlToImage: el.image
      };
      this.noticias.push(not);
    });
  }

}
