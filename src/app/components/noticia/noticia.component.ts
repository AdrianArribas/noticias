import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, PopoverController, ToastController } from '@ionic/angular';
import { Article } from '../../interfaces/interfaces';
import { PopoverComponent } from '../popover/popover.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LocalDataService } from 'src/app/services/local-data.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() public noticia: Article;
  @Input() public index: number;
  @Input() public fav: boolean;

  constructor(
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController,
    public social: SocialSharing,
    private localData: LocalDataService,
    public toastController: ToastController) { }

  ngOnInit() { }

  public async lanzarMenu(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: { fav: this.fav, cosa: 'ojete' }
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
      this.presentToastWithOptions('Mensaje:', 'Noticia añadida a favoritos');
      this.localData.guardarNoticia(this.noticia);
    } else if (data?.item.srcElement.childNodes[0].data.includes('Eliminar')) {
      console.log('eliminado');
      this.presentToastWithOptions('Mensaje:', 'Noticia eliminada correctamente');
      this.localData.borrarNoticia(this.noticia);
    }

  }

  async presentToastWithOptions(titulo: string, texto: string) {
    const toast = await this.toastController.create({
      header: titulo,
      message: texto,
      position: 'top',
      duration: 2000,
    });
    await toast.present();
  }

}
