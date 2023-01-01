import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Sales } from "src/app/models/sales/sales.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SalesService {
  private token: string;
  baseUrl: string = environment.baseUrl;
  headers: { Authorization: string; storeId: string };

  constructor(private http: HttpClient) {
    this.headers = {
      Authorization: `Bearer ${this.getToken()}`,
      storeId: sessionStorage.getItem("storeId"),
    };
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("mean-token");
    }
    return this.token;
  }

  // Create
  createSales(body): Observable<any> {
    let url = `${this.baseUrl}/sales/create`;
    return this.http
      .post(url, body, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Get all Sales
  getAllSales(): Observable<Sales[]> {
    return this.http.get<Sales[]>(`${this.baseUrl}/sales`, {
      headers: this.headers,
    });
  }

  // Get Sales
  getSales(id): Observable<any> {
    let url = `${this.baseUrl}/sales/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update Sales
  updateSales(id, data): Observable<any> {
    let url = `${this.baseUrl}/sales/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete Sales
  deleteSales(id): Observable<any> {
    let url = `${this.baseUrl}/sales/delete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
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
