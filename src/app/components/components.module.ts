import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { IonicModule } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';



@NgModule({
  declarations: [NoticiasComponent, NoticiaComponent, PopoverComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NoticiaComponent,
    NoticiasComponent,
    PopoverComponent
  ]
})
export class ComponentsModule { }
