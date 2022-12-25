import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private token: string;
  baseUrl: string = environment.baseUrl;
  headers: { Authorization: string };

  constructor(private http: HttpClient) {
    this.headers = { Authorization: `Bearer ${this.getToken()}` };
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("mean-token");
    }
    return this.token;
  }

  createProfile(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/profile/create`, body, {
      headers: this.headers,
    });
  }

  // Get Profile
  getProfile(id): Observable<any> {
    let url = `${this.baseUrl}/api/profile/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  updateProfile(id, body): Observable<any> {
    let url = `${this.baseUrl}/api/profile/update/${id}`;
    return this.http
      .put(url, body, { headers: this.headers })
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
