import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conta } from '../models/conta';
import { appSettings } from '../app.config';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  private apiUrl = `${appSettings.apiBaseUrl}/contas`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  listar(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.apiUrl, this.loginService.gerarCabecalhoHTTP());
  }

  salvar(contas: Conta): Observable<Conta> {
    if (contas.id) {
      return this.http.put<Conta>(`${this.apiUrl}/${contas.id}`, contas);
    } else {
      return this.http.post<Conta>(this.apiUrl, contas);
    }
  }

  buscarPorId(id: number): Observable<Conta> {
    return this.http.get<Conta>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }

  // contas.service.ts
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      this.loginService.gerarCabecalhoHTTP() // Garante o envio do token
    );
  }
}
