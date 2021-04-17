import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public obs: Observable<any>;
  public noticias: Article[] = [];

  constructor(private nociticasService: NoticiasService) { }

  ngOnInit() {
    this.nociticasService.getTopHeadlines().subscribe((res) => {
      console.log('res:', res);
      this.noticias.push(...res.articles); //ver notas
    });

    // this.obs = this.nociticasService.getTopHeadlines();
  }

}
