import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { appSettings } from '../app.config';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = `${appSettings.apiBaseUrl}/clientes`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl, this.loginService.gerarCabecalhoHTTP());
  }

  salvar(cliente: Cliente): Observable<Cliente> {
    if (cliente.id) {
      return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente);
    } else {
      return this.http.post<Cliente>(this.apiUrl, cliente);
    }
  }

  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }

  // cliente.service.ts
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      this.loginService.gerarCabecalhoHTTP() // Garante o envio do token
    );
  }
}
