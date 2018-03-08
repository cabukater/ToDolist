import { Component } from "@angular/core";
import { NavController, AlertController, Nav, ModalController} from 'ionic-angular';
import { Todos } from '../../providers/todos/todos';
import { DetalhePage } from '../../pages/detalhe/detalhe';




 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {

  toggleStyle: any;
  ModalController: any;
  public hora_agora = new Date();

 
  todos: any;


 
  constructor(
    public todoService: Todos, public alertCtrl: AlertController, public modal: ModalController,public navCtrl:NavController ){
 
  }

  




 
  ionViewDidLoad(){
    this.todoService.getTodos().then((data) => {
      this.todos = data;
    });

    
  }
//imagens do fundo conforme  a hora do dia
  getBg(){
    let time:any = new Date().getHours();

    if ( time > 6 && time <= 17  ){
      return "url('https://firebasestorage.googleapis.com/v0/b/todoimages.appspot.com/o/day.jpg?alt=media&token=6c84d505-5b6f-42cc-ab7e-590968753129')";
  
      ;
        
    }if( time == 18  && time <= 23  ){
      return "url('https://firebasestorage.googleapis.com/v0/b/todoimages.appspot.com/o/night.jpg?alt=media&token=faffda58-0a34-4ae3-be5e-da814d759bcd')";
      
      
    }if (time => 0  && time <=  5  ){
      return "url('https://firebasestorage.googleapis.com/v0/b/todoimages.appspot.com/o/morning.jpg?alt=media&token=e8962fc1-a574-46cf-83e2-38f65c8da96b')";
     
    }

  
  }

  
 //Abrir detalhe da tarefa
  abreDetalhe(todo:any){
    
   // this.navCtrl.push(DetalhePage, {tarefa:todo});
    const myModal = this.modal.create(DetalhePage, {tarefa:todo});
    myModal.present();
 
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