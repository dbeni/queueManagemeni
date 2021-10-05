import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
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
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
