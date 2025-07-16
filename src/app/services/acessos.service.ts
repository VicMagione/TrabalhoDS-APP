import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appSettings } from '../app.config';
import { LoginService } from './login.service';
import { Acesso } from '../models/acesso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcessosService {
  private apiUrl = `${appSettings.apiBaseUrl}/acessos`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  listar(): Observable<Acesso[]> {
    return this.http.get<Acesso[]>(this.apiUrl, this.loginService.gerarCabecalhoHTTP());
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      this.loginService.gerarCabecalhoHTTP() // Garante o envio do token
    );
  }

}
