import { Injectable } from '@angular/core';
import { GlobalState } from './GlobalState';
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
  // AddUser(data: User): Observable<any> {
  //   let API_URL = `${this.REST_API}/add-user`;
  //   return this.httpClient.post(API_URL, data)
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }
  // // Get all objects
  // GetUsers() {
  //   return this.httpClient.get(`${this.REST_API}/users`);
  // }
  // // Get single object
  // GetUser(id:any): Observable<any> {
  //   let API_URL = `${this.REST_API}/read-user/${id}`;
  //   return this.httpClient.get(API_URL, { headers: this.httpHeaders })
  //     .pipe(map((res: any) => {
  //         return res || {}
  //       }),
  //       catchError(this.handleError)
  //     )
  // }
  // // Update
  // updateUser(id:any, data:any): Observable<any> {
  //   let API_URL = `${this.REST_API}/update-user/${id}`;
  //   return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }
  // // Delete
  // deleteUser(id:any): Observable<any> {
  //   let API_URL = `${this.REST_API}/delete-user/${id}`;
  //   return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
  //       catchError(this.handleError)
  //     )
  // }


  // Error
  handleError(error: HttpErrorResponse) {
    console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    console.log(errorMessage);

    return throwError(errorMessage);
  }
}
