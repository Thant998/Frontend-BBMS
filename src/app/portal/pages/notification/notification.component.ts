import { Component, OnInit } from '@angular/core';
import { NotificationDTO } from '../../DTO/notification.dto';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notification = new NotificationDTO()
  noti : NotificationDTO [] =[];

  constructor(private noti_:NotificationService) { }

  ngOnInit(): void {
    this.getNoti()
  }



  getNoti(){
    this.noti_.getNotification()
    .subscribe({
      next: ( data) =>{
         this.noti = data
         console.log(this.noti , 'noti data')
     },
      error : (e) => console.log(e)
   });
  }
  

}
