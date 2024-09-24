import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Stocks } from "src/app/models/stocks/stocks.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class StocksService {
  private token: string;
  baseUrl: string = environment.baseUrl;
  headers: { Authorization: string; storeId: string };

  constructor(private http: HttpClient) {
    this.headers = {
      Authorization: `Bearer ${this.getToken()}`,
      storeId: localStorage.getItem("storeId"),
    };
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("mean-token");
    }
    return this.token;
  }

  // Create
  createStocks(body): Observable<any> {
    let url = `${this.baseUrl}/stocks/create`;
    return this.http
      .post(url, body, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Get all Stocks
  getAllStocks(): Observable<Stocks[]> {
    return this.http.get<Stocks[]>(`${this.baseUrl}/stocks`, {
      headers: this.headers,
    });
  }

  // Get Stocks
  getStocks(id): Observable<any> {
    let url = `${this.baseUrl}/stocks/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update Stocks
  updateStocks(id, data): Observable<any> {
    let url = `${this.baseUrl}/stocks/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete Stocks
  deleteStocks(id): Observable<any> {
    let url = `${this.baseUrl}/stocks/delete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Search Stocks
  searchStocks(term): Observable<any> {
    let url = `${this.baseUrl}/stocks/search?term=` + term;
    return this.http
      .get(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
