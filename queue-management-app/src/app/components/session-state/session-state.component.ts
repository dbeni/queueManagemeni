import { Component, OnInit } from '@angular/core';
import { RestService } from './../../service/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-session-state',
  templateUrl: './session-state.component.html',
  styleUrls: ['./session-state.component.css']
})
export class SessionStateComponent implements OnInit {

  GlobalSessionState:any = null;
  RoomsCount:any = null;
  TorCount:any = null;

  constructor(private restService: RestService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.restService.getGlobalState().subscribe((res) => {
      this.GlobalSessionState = res.data.globalState;
      this.RoomsCount = res.data.roomsCount;
      this.TorCount = res.data.torCount;
    }, (err) => {
      this.snackBar.open(err, "Close", {
        duration: 3000,
        verticalPosition:"top"
      });
    })
  }

  startSession() {
    let countOfRooms = window.prompt('Start session, count of rooms:', "1");
    this.restService.startSession(countOfRooms).subscribe((res) => {
      this.GlobalSessionState = res.data.globalState;
      this.RoomsCount = res.data.roomsCount;
      this.TorCount = res.data.torCount;
    }, (err) => {
      this.snackBar.open(err, "Close", {
        duration: 3000,
        verticalPosition:"top"
      });
    })
  }

  stopSession() {
    if(window.confirm('Do you want to stop session, and reset all values?')) {
      this.restService.stopSession().subscribe((res) => {
        this.GlobalSessionState = res.data.globalState;
        this.RoomsCount = null;
        this.TorCount = null;
      }, (err) => {
        this.snackBar.open(err, "Close", {
          duration: 3000,
          verticalPosition:"top"
        });
      })
    }
  }
}
