import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appSettings } from '../app.config';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${appSettings.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) { }

  autenticar(login: string, senha: string): Observable<Token> {
    const objetoJS = { login, senha };
    return this.http.post<Token>(this.apiUrl, objetoJS);
  }

  salvarToken(token: string): void {
    localStorage.setItem("Token", token);
  }

  obterToken(): string {
    return localStorage.getItem("Token") || "";
  }

  limparToken(): void {
    localStorage.removeItem("Token");
  }
}
