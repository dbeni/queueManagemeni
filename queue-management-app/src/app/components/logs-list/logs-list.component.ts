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
      this.GlobalSessionState = res.data.globalState;
    });

    this.init();
    //auto refresh every 5 second, for use in 2 tabs/windows
    setInterval(() => this.init(), 5000);
  }

  init(): void {
    this.restService.getLogs().subscribe((res) => {
      this.LogsList = res.data.logsList.reverse();
    });
  }
}
