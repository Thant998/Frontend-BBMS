import {Component, Input, OnInit} from '@angular/core';
import { TaskService } from 'src/app/portal/services/task.service';
import { SharedService } from 'src/app/share/shared.service';
import Swal from 'sweetalert2';
import {Card} from '../../../../model/card/card.model';
import { BoardComponent } from '../../board/board.component';

@Component({
  selector: 'app-card-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  @Input() card!: Card;
  @Input() listIndex!: number;
  @Input() cardIndex!: number;

  constructor(private share_ : SharedService,
              private task_ : TaskService) { }

  ngOnInit() {  
  }

  identifyCardBeingDragged(dragEvent: DragEvent) {
    dragEvent.dataTransfer!.effectAllowed = 'move'
    dragEvent.dataTransfer!.dropEffect= 'move'
    const transferObject = {
      'listIndex' : this.listIndex,
      'cardIndex' : this.cardIndex
    };
    dragEvent.dataTransfer!.setData( 'text', JSON.stringify(transferObject));
  }

  allowCardDragToBeDropped(dragEvent: DragEvent) {
    dragEvent.dataTransfer!.dropEffect= 'move'
    dragEvent.preventDefault();
  }

  cardClick(){
    let board_id = localStorage.getItem('board_id')
    this.share_.router.navigate(['/portal/todo/' + board_id] , {queryParams : {task_id  : this.card.id}})
    localStorage.setItem('task_id' , this.card.id)
    this.share_.openModal('card-detail-modal')
  }
  
  deleteTask(task_id : string) 
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        this.task_.deleteTask(task_id).subscribe(data => {
          console.log("delete")  
          setTimeout(function(){
            window.location.reload()},0.05)      
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )     
    })
  }
  
}
