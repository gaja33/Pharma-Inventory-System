import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private token: string;
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("mean-token");
    }
    return this.token;
  }

  createProfile(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/profile/create`, body, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  }
}
