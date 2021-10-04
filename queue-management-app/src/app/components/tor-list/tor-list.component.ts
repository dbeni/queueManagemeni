import { Component, OnInit } from '@angular/core';
import { RestService } from './../../service/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tor-list',
  templateUrl: './tor-list.component.html',
  styleUrls: ['./tor-list.component.css']
})

export class TorListComponent implements OnInit {

  constructor(private restService: RestService, private snackBar: MatSnackBar) {
  }

  GlobalSessionState:any = null;
  TorCount:any = null;
  TorIds:any = [];
  Message:any = null;

  ngOnInit(): void {
    this.restService.getGlobalState().subscribe((res) => {
      console.log(res.data);
      this.GlobalSessionState = res.data.globalState;
      this.TorCount = res.data.torCount;
      this.TorIds = new Array(this.TorCount);
    });
  }

  takeNumber(torId : number): void {
    this.restService.takeNumber(torId).subscribe((res) => {
      console.log(res.data);
      this.Message = res.message;
      this.snackBar.open(this.Message, "OK");
    })
  }

}
