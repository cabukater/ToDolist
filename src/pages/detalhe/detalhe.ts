import { Component } from '@angular/core';
import { Modal, NavParams, ViewController, ModalController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the DetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-detalhe',
  templateUrl: 'detalhe.html',
})
export class DetalhePage {
 

  title: any;
  texto: any;

  tarefa:any;

  constructor(private navParams: NavParams ,private view:ViewController) {
    this.tarefa = this.navParams.get('tarefa');



  }





  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhePage');
  }


  dismiss(){
   this.view.dismiss();
  }


 

  

}
