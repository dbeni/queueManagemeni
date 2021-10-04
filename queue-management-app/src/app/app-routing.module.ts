import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SessionStateComponent } from './components/session-state/session-state.component';
import { TorListComponent } from './components/tor-list/tor-list.component';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { LogsListComponent } from './components/logs-list/logs-list.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'session-state' },
  { path: 'session-state', component: SessionStateComponent },
  { path: 'tor-list', component: TorListComponent },
  { path: 'rooms-list', component: RoomsListComponent },
  { path: 'logs-list', component: LogsListComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
