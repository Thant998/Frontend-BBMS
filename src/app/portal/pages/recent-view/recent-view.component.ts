import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/share/shared.service';
import { Board } from '../../DTO/board.dto';

@Component({
  selector: 'app-recent-view',
  templateUrl: './recent-view.component.html',
  styleUrls: ['./recent-view.component.scss']
})
export class RecentViewComponent implements OnInit {

  boards !: Board[];
  constructor(private share_ : SharedService) { }

  ngOnInit(): void {
    this.share_.spinner.show()
    this.share_.showAllRecentView().subscribe(data => { this.boards =data;
    })
    this.share_.spinner.hide()
  }

  goToDo(boardId : number){
    this.share_.router.navigate(['portal/todo/'+boardId])
  }
}
