import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Todos } from '../../providers/todos/todos';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the DetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe',
  templateUrl: 'detalhe.html',
})
export class DetalhePage {
  title: any;
  texto: any;
  todo: any;
  todoService: any;
  tarefa:any;

  constructor(public navCtrl: NavController, TodoService: Todos,public navParams: NavParams, public alertCtrl: AlertController) {
    this.tarefa = this.navParams.get('tarefa');



  }





  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhePage');
  }



 

  

}
