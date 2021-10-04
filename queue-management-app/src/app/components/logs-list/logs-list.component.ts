import { Component, OnInit } from '@angular/core';
import { RestService } from './../../service/rest.service';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent implements OnInit {

  constructor(private restService: RestService) { }

  GlobalSessionState:any = null;
  LogsList:any = null;

  DisplayedColumns: string[] = ['timeStamp', 'comment'];

  ngOnInit(): void {
    this.restService.getGlobalState().subscribe((res) => {
      console.log(res.data);
      this.GlobalSessionState = res.data.globalState;
    });

    this.restService.getLogs().subscribe((res) => {
      console.log(res.data);
      this.LogsList = res.data.logsList;
    });
  }

}
