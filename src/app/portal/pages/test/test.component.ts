import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/share/shared.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  boardId !: number;
  constructor(private share_ : SharedService,private route : Router , private router : ActivatedRoute) { }

  ngOnInit(): void {
    this.boardId = this.router.snapshot.params['boardId'];
    //localStorage.setItem('recentBoard',this.boardId)
    this.share_.recentView(this.boardId).subscribe (data => {
      this.boardId 
      console.log(this.boardId)
      this.share_.router.navigate(['protal/dashboard'])
    });  
    // console.log(this.boardId)
  }

}
