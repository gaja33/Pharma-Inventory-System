import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Doctors } from "src/app/models/doctors/doctors.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DoctorsService {
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
  createDoctors(body): Observable<any> {
    let url = `${this.baseUrl}/doctors/create`;
    return this.http
      .post(url, body, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Get all Doctors
  getAllDoctors(): Observable<Doctors[]> {
    return this.http.get<Doctors[]>(`${this.baseUrl}/doctors`, {
      headers: this.headers,
    });
  }

  // Get Doctors
  getDoctors(id): Observable<any> {
    let url = `${this.baseUrl}/doctors/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update Doctors
  updateDoctors(id, data): Observable<any> {
    let url = `${this.baseUrl}/doctors/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete Doctors
  deleteDoctors(id): Observable<any> {
    let url = `${this.baseUrl}/doctors/delete/${id}`;
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
