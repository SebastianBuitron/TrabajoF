import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { PlacesService } from 'src/app/services/places.service';
import { Task } from './task';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {
  tasks: Array<Task> = [];
  task:Task={
    title: '',
    status: '',
  };

  constructor(private placesService:PlacesService) {
    this.placesService.getNotes().subscribe((res) => {
      console.log(res);
      this.tasks=[];
      res.forEach((element) => {
        let theNewTask = element['title'];
          if (theNewTask !== '') {
          this.tasks.push({ title: theNewTask, status: 'open' });
        } 
      });
    });
    
  }

  ngOnInit() {
  }

  addItem() {
    let theNewTask: string | null = prompt("New task");

    if (theNewTask !== '') {
      this.tasks.push({title: theNewTask, status: 'open'});
      this.task = { title: theNewTask, status: 'open' };
      this.placesService.addPlace(this.task);
    }
  }

  markAsDone(slidingItem: IonItemSliding, task: Task) {
    task.status = 'done';
    setTimeout(() => { slidingItem.close(); }, 1);
  }

  removeTask(slidingItem: IonItemSliding, task: Task) {
    task.status = 'removed';
    let index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);

    }
    setTimeout(() => { slidingItem.close(); }, 1);
    this.placesService.delete(task)
  }
  onSubmit(){
    console.log(this.tasks.values);
    
}
}
