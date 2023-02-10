import { Injectable } from '@angular/core';
import { collectionData, Firestore} from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import Place from 'src/interfaces/place.interface';
import { Task } from 'src/app/pages/tasklist/task';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private firestore: Firestore) { }
  getNotes(){
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef);
}

addPlace(task: Task) {
  const notesRef = collection(this.firestore, 'notes');
  return addDoc(notesRef, task)
  
}
delete(task:Task) {
  console.log(task);
  const itemRef = doc(this.firestore,`notes/${task.title}`);
  return deleteDoc(itemRef);
}
}
