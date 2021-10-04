import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestService } from './../../service/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @Input() roomProperties = {
    roomId : null,
    roomName : null,
    currentQueueNumber : null,
    lastQueueNumber : null
  };

  @Output() sendQueueAndLast = new EventEmitter<object>();

  QueueAndLast :any = {queue : null, last : null};

  constructor(private restService: RestService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  acceptNumber(roomId : any): void {
    this.restService.acceptNumber(roomId).subscribe((res) => {
      console.log(res.data);
      this.roomProperties.currentQueueNumber = res.data.room.currentQueueNumber;
      this.QueueAndLast.queue = res.data.queue;
      this.sendQueueAndLast.emit(this.QueueAndLast);
      this.snackBar.open(res.message, "OK");
    }, (err) => {
      this.snackBar.open(err, "Close");
    })
  }

  skipNumber(roomId : any): void {
    this.restService.skipNumber(roomId).subscribe((res) => {
      console.log(res.data);
      this.QueueAndLast.queue = res.data;
      this.sendQueueAndLast.emit(this.QueueAndLast);
      this.snackBar.open(res.message, "OK");
    }, (err) => {
      this.snackBar.open(err, "Close");
    })
  }

  releaseNumber(roomId : any): void {
    this.restService.releaseNumber(roomId).subscribe((res) => {
      console.log(res.data);
      this.roomProperties.currentQueueNumber = res.data.room.currentQueueNumber;
      this.QueueAndLast.queue = res.data.queue;
      this.QueueAndLast.last = res.data.releasedNumber;
      this.sendQueueAndLast.emit(this.QueueAndLast);
      this.snackBar.open(res.message, "OK");
    }, (err) => {
      this.snackBar.open(err, "Close");
    })
  }

}
