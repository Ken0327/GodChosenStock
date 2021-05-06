import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Stock } from './chart';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Access',
    // 'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
    // Authorization: 'my-auth-token'
  })
};

@Injectable()
export class StockService {
  init() {
    console.log('initial stock service');
  }
  // stockUrl = 'api/stockes';  // URL to web api 
  stockUrl = 'https://pythongodchooseapi.azurewebsites.net/';  // URL to web api 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('StockService');
  }

  /* GET stockes whose name contains search term */
  getStock(): Observable<Object> {  
    return this.http.get<Object>(this.stockUrl, httpOptions)
  }

  //////// Save methods //////////

  /** POST: add a new stock to the database */

  getStockHistory(stock: Stock): Observable<Object> {
    return this.http.post<Object>(this.stockUrl + 'BasicInfo/SingleStockHistory', stock, httpOptions)
      .pipe(
        catchError(this.handleError('getStockHistory', stock))
      );
  }

  addStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.stockUrl, stock, httpOptions)
      .pipe(
        catchError(this.handleError('addStock', stock))
      );
  }

  /** PUT: update the stock on the server. Returns the updated stock upon success. */
  updateStock(stock: Stock): Observable<Stock> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Stock>(this.stockUrl, stock, httpOptions)
      .pipe(
        catchError(this.handleError('updateStock', stock))
      );
  }
}
