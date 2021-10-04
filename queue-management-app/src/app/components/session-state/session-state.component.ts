import { Component, OnInit } from '@angular/core';
import { RestService } from './../../service/rest.service';

@Component({
  selector: 'app-session-state',
  templateUrl: './session-state.component.html',
  styleUrls: ['./session-state.component.css']
})
export class SessionStateComponent implements OnInit {

  GlobalSessionState:any = null;
  RoomsCount:any = null;
  TorCount:any = null;

  constructor(private restService: RestService) {
  }

  ngOnInit(): void {
    this.restService.getGlobalState().subscribe((res) => {
      //console.log(res.data);
      this.GlobalSessionState = res.data.globalState;
      this.RoomsCount = res.data.roomsCount;
      this.TorCount = res.data.torCount;
    });
  }

  startSession() {
    let countOfRooms = window.prompt('Start session, count of rooms:', "1");
    this.restService.startSession(countOfRooms).subscribe((res) => {
      console.log(res.data);
      this.GlobalSessionState = res.data.globalState;
      this.RoomsCount = res.data.roomsCount;
      this.TorCount = res.data.torCount;
    })
  }

  stopSession() {
    if(window.confirm('Do you want to stop session, and reset all values?')) {
      this.restService.stopSession().subscribe((res) => {
        console.log(res.data.globalState)
        this.GlobalSessionState = res.data.globalState;
        this.RoomsCount = null;
        this.TorCount = null;
      })
    }
  }
}
