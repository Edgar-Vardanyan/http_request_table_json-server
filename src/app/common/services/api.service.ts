import {Observable} from "rxjs";
import {User} from "../interfaces/user";
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,) {
  }

  private url = "http://localhost:3000/users/";

  createUser(data: any): Observable<User> {
    return this.http.post<User>(this.url, data);
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  updateUser(data: User, id: number)  {
    return this.http.put<any>(`${this.url}${id}`, data);
  }

  removeUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}${id}`);
  }

}

