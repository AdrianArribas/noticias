import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { Article } from '../../interfaces/interfaces';
import { PopoverComponent } from '../popover/popover.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() public noticia: Article;
  @Input() public index: number;

  constructor(
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController,
    public social: SocialSharing) { }

  ngOnInit() { }

  public async lanzarMenu(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();

    if (data?.item.srcElement.childNodes[0].data.includes('Compartir')) {
      console.log('share');
      this.social.share(
        this.noticia.title,
        this.noticia.source?.name,
        this.noticia.url
      );

    } else if (data?.item.srcElement.childNodes[0].data.includes('Favoritos')) {
      console.log('Fav');
    }

  }

}
