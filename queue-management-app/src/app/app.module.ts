import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartSessionComponent } from './components/start-session/start-session.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TorListComponent } from './components/tor-list/tor-list.component';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { LogsListComponent } from './components/logs-list/logs-list.component';
import { SessionStateComponent } from './components/session-state/session-state.component';
import { RoomComponent } from './components/room/room.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    StartSessionComponent,
    TorListComponent,
    RoomsListComponent,
    LogsListComponent,
    SessionStateComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatSnackBarModule,
    MatTableModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
