import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  public opciones = [
    {
      texto: 'Compartir',
      icon: 'share-social'
    },
    {
      texto: 'Favoritos',
      icon: 'heart'
    }
  ];

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() { }
  public onClick(ev) {
    this.popoverCtrl.dismiss({ item: ev });
  }
}
