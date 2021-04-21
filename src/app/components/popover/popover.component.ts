import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {


  @Input() fav;
  @Input() cosa;

  public opciones = [];

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {

    if (!this.fav) {
      this.opciones = [{
        texto: 'Compartir',
        icon: 'share-social'
      },
      {
        texto: 'Favoritos',
        icon: 'heart'
      }];
    } else {
      this.opciones = [{
        texto: 'Compartir',
        icon: 'share-social'
      },
      {
        texto: 'Eliminar',
        icon: 'heart-dislike-outline'
      }];
    }

  }

  public onClick(ev) {
    this.popoverCtrl.dismiss({ item: ev });
  }
}
