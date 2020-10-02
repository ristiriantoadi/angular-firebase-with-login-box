import { Component } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
// import { LoginComponentComponent } from './login-component/login-component.component';
// import { RegisterComponentComponent } from './register-component/register-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebase-angular';

  updateItemKey
  updateItemValue
  itemsRef: AngularFireList<any>;
  items = [];
  constructor(db:AngularFireDatabase,public dialog:MatDialog){
    this.itemsRef=db.list("/items");
    this.itemsRef.snapshotChanges(['child_added','child_changed','child_moved','child_removed'])
      .subscribe(actions=>{
        this.items=[]
        actions.forEach(action=>{
          this.items.push({'key':action.payload.key,'value':action.payload.val().value})
        })
      })
  }

  addItem(itemValue){
    // console.log(item) 
    this.itemsRef.push({"value":itemValue})   
  }

  updateInput(item){
    this.updateItemKey=item.key
    this.updateItemValue=item.value
  }

  updateItem(){
    console.log(this.updateItemKey)
    this.itemsRef.update(this.updateItemKey,{"value":this.updateItemValue});
  }

  deleteItem(){
    this.itemsRef.remove(this.updateItemKey)
  }

  openLogin(){
    // open(LoginComponentComponent)
    const dialogRef = this.dialog.open(LoginComponentComponent, {
      // width: '400px',
      // height:'500px'
      // data: {name: this.name, animal: this.animal}
    });
  }
  openRegister(){
    // open(RegisterComponentComponent)
    const dialogRef = this.dialog.open(RegisterComponentComponent, {
      // width: '250px',
      // height:'500px'
      // data: {name: this.name, animal: this.animal}
    });
  }

  open(component:Component){
  }

}
