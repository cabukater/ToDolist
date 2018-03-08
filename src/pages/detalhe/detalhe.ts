import { Component } from '@angular/core';
import { Modal, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
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
 
  view: any;
  title: any;
  texto: any;
  todo: any;
  todoService: any;
  tarefa:any;

  constructor(public navCtrl: NavController,public navParams: NavParams , view:ViewController, public  modal:ModalController) {
    this.tarefa = this.navParams.get('tarefa');



  }





  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhePage');
  }


  cancel(){
   this.view.dismiss();
  }


 

  

}
