import { Component } from "@angular/core";
import { DatePipe } from '@angular/common';
import { NavController, AlertController, Nav} from 'ionic-angular';
import { Todos } from '../../providers/todos/todos';
import { DetalhePage } from '../../pages/detalhe/detalhe';




 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {

  ModalController: any;
  public hora_agora = new Date();

 
  todos: any;


 
  constructor(
    public todoService: Todos, public alertCtrl: AlertController, public navCtrl:NavController ){
 
  }




 
  ionViewDidLoad(){
    this.todoService.getTodos().then((data) => {
      this.todos = data;
    });
  }
 //Abrir detalhe da tarefa
  abreDetalhe(todo:any){
    this.navCtrl.push(DetalhePage, {tarefa:todo});
 
   }


  createTodo(todo:any){
    let prompt = this.alertCtrl.create({
      title: 'Novo',
      message: 'O que você precisa fazer?',
      inputs: [
        {
          name: 'title',
          placeholder: 'Titulo'
                 
        },
        {
          name: 'texto',
          placeholder: 'Descreva oque voce vai fazer'
                 
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          cssClass: "btn-cancel",
        },
        {
          text: 'Salvar',
          cssClass: "btn-action",
          handler: data => {
            this.todoService.createTodo({title: data.title, texto: data.texto});
            
          }
        }
      ]
    });
 
    prompt.present();
  }

  //UPDATE
 
 updateTodo(todo){
    
    let prompt = this.alertCtrl.create({
      
      title: 'Editar',
      message: 'Mudou de ideia?',
      inputs: [
        {
          name: 'title',
          placeholder: 'Titulo da Tarefa'
                 
        },
        {
          name: 'texto',
          placeholder: 'Descreva oque voce vai fazer'
                 
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          cssClass: "btn-cancel",
        },
        {
          text: 'Salvar',
          cssClass: "btn-action",
          handler: data => {
            this.todoService.updateTodo({
              _id: todo._id,
              _rev: todo._rev,
              title: data.title,
              texto: data.texto
            });
          }
        }
      ]
    });
 
    prompt.present();
  
  }
 
  deleteTodo(todo){
  
    let prompt = this.alertCtrl.create({
      
      title: 'Finalizar',
      cssClass: 'alert-dark',
   
      message: 'Ao concluir a tarefa ela será deletada tem certeza que deseja finalizar a tarefa?',
      
      buttons: [
        {
          text: 'Cancelar',
          cssClass: "btn-cancel",
        },
        {
          text: 'Finalizar',
          cssClass: "btn-action",
          
          handler: data => {
            this.todoService.deleteTodo(todo);
          }
        }
      ]
    });
 
    prompt.present();
  
  }
 
  


 

 

  
 
}