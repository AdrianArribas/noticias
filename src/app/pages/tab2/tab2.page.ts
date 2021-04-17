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

  public noticias: Article[] = [];

  constructor(private service: NoticiasService) { }

  ngOnInit() {
    this.service.getNewsByCategory(this.categorias[0]).subscribe((res) => {
      this.noticias.push(...res.articles);
      console.log(this.noticias);
    });
  }

  ngAfterViewInit() {
    this.segment.value = this.categorias[0];
  }

  public getCategoria(event) {
    this.service.getNewsByCategory(event.detail.value).subscribe((res) => {
      // this.noticias.push(...res.articles);
      this.noticias = res.articles;
      // console.log(this.noticias);
      this.content.scrollToTop();
    });



  }

}
