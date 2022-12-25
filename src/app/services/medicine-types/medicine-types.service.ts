import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { MedicineTypes } from "src/app/models/medicine-types/medicine-types.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MedicineTypesService {
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

  // Create
  createMedicineTypes(body): Observable<any> {
    let url = `${this.baseUrl}/medicineTypes/create`;
    return this.http
      .post(url, body, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Get all Categorys
  getAllMedicineTypes(): Observable<MedicineTypes[]> {
    return this.http.get<MedicineTypes[]>(`${this.baseUrl}/medicineTypes`, {
      headers: this.headers,
    });
  }

  // Get MedicineTypes
  getMedicineTypes(id): Observable<any> {
    let url = `${this.baseUrl}/medicineTypes/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update MedicineTypes
  updateMedicineTypes(id, data): Observable<any> {
    let url = `${this.baseUrl}/medicineTypes/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete MedicineTypes
  deleteMedicineTypes(id): Observable<any> {
    let url = `${this.baseUrl}/medicineTypes/delete/${id}`;
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
