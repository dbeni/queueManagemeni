import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class RestService {
  // Node/Express API
  REST_API: string = 'http://localhost:3000';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
  // Get Global State
  getGlobalState() : Observable<any> {
    return this.httpClient.get(`${this.REST_API}/sessionState`);
  }

  startSession(countOfRooms: any) : Observable<any> {
    return this.httpClient.post(`${this.REST_API}/start`, {"roomsCount" : countOfRooms})
    .pipe(catchError(this.handleError));
  }

  stopSession() : Observable<any> {
    return this.httpClient.post(`${this.REST_API}/stop`, null)
    .pipe(catchError(this.handleError));
  }

  takeNumber(torId:any): Observable<any> {
    return this.httpClient.post(`${this.REST_API}/takeNumber`, {"torId" : torId})
    .pipe(catchError(this.handleError));
  }

  getRooms() : Observable<any> {
    return this.httpClient.get(`${this.REST_API}/rooms`)
    .pipe(catchError(this.handleError));
  }

  acceptNumber(roomId:any): Observable<any> {
    return this.httpClient.post(`${this.REST_API}/rooms/${roomId}/accept`, {})
    .pipe(catchError(this.handleError));
  }

  releaseNumber(roomId:any): Observable<any> {
    return this.httpClient.post(`${this.REST_API}/rooms/${roomId}/out`, {"actionType" : "R"})
    .pipe(catchError(this.handleError));
  }

  skipNumber(roomId:any): Observable<any> {
    return this.httpClient.post(`${this.REST_API}/rooms/${roomId}/out`, {"actionType" : "S"})
    .pipe(catchError(this.handleError));
  }

  getLogs() : Observable<any> {
    return this.httpClient.get(`${this.REST_API}/logs`)
    .pipe(catchError(this.handleError));
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }

    return throwError(errorMessage);
  }
}
