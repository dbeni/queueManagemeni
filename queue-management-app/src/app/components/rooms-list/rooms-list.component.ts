import { Component, OnInit } from '@angular/core';
import { RestService } from './../../service/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  constructor(private restService: RestService, private snackBar: MatSnackBar) { }

  GlobalSessionState:any = null;
  Rooms:any = null;
  Queue:any = null;
  LastReleasedQueueNumber:any = null;

  ngOnInit(): void {
    this.init();
    //auto refresh every 5 second, for use in 2 tabs/windows
    setInterval(() => this.init(), 5000);
  }

  init() {
    this.restService.getGlobalState().subscribe((res) => {
      this.GlobalSessionState = res.data.globalState;
    }, (err) => {
      this.snackBar.open(err, "Close", {
        duration: 3000,
        verticalPosition:"top"
      });
    });


    this.restService.getRooms().subscribe((res) => {
      this.Rooms = res.data.rooms;
      this.Queue = res.data.queue;
      this.LastReleasedQueueNumber = res.data.lastReleasedQueueNumber;
    }, (err) => {
      this.snackBar.open(err, "Close", {
        duration: 3000,
        verticalPosition:"top"
      });
    })
  }

  updateQueueAndLast(queueAndLast: any) {
    this.Queue = queueAndLast.queue;
    this.LastReleasedQueueNumber = queueAndLast.last;

    if (this.Queue.length === 0) {
      this.restService.getRooms().subscribe((res) => {
        this.Rooms = res.data.rooms;
      }, (err) => {
        this.snackBar.open(err, "Close", {
          duration: 3000,
          verticalPosition:"top"
        });
      });
    }
  }
}
