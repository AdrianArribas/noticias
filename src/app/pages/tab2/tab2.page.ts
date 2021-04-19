import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { IonContent, IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { RespuestaTopHeadLines, Article } from '../../interfaces/interfaces';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit {

  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild(IonContent) content: IonContent;

  public categorias = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];

  public pageCategoria = 0;
  public noticias: Article[] = [];
  public categoria: string;

  constructor(private service: NoticiasService) { }


  ngOnInit() {
    this.getNoticias(this.categorias[0], 0);
    this.categoria = this.categorias[0];
  }

  ngAfterViewInit() {
    this.segment.value = this.categorias[0];
  }

  public getCategoria(event) {
    this.noticias = [];
    this.categoria = event.detail.value;
    this.getNoticias(this.categoria, this.pageCategoria);
    this.pageCategoria = 0;

  }

  public getNoticias(categoria: string, page: number, scrol?) {
    this.service.getNewsByCategory(categoria, 0).subscribe((res) => {
      console.log(this.noticias);
      this.content.scrollToTop();
      this.pageCategoria++;

      // return this.noticias = res.articles;
      if (scrol) {
        scrol.target.complete();
      }

      return this.noticias.push(...res.articles);
    });
  }

  public loadData(ev) {
    this.getNoticias(this.categoria, this.pageCategoria, ev);
  }

}
