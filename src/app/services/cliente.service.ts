import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
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
    return this.http.put<Cliente>(`${this.apiUrl}/cpf/${cliente.cpf}`, cliente, this.loginService.gerarCabecalhoHTTP());

  }
  criar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);

  }
  atualizarCliente(cpf: string, clienteData: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/cpf/${cpf}`,
      clienteData
    );
  }

  buscarPorCpf(cpf: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cpf/${cpf}`);
  }

  verificarClientePorCpfEmail(cpf: string, email: string): Observable<{ valido: boolean }> {
    return of({ valido: true }).pipe(delay(100));
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

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/cpf/${id}`, this.loginService.gerarCabecalhoHTTP()).pipe(
      catchError((err) => {
        console.error('Erro na requisição:', err);
        return of({ nome: 'Usuário' } as Cliente); // Retorna um objeto padrão em caso de erro
      })
    );
  }
  // cliente.service.ts
  getClienteIdPorCpf(cpf: string): Observable<number> {
    return this.http.get<Cliente>(`${this.apiUrl}/cpf/${cpf}`, this.loginService.gerarCabecalhoHTTP()).pipe(
      map(cliente => {
        if (!cliente?.id) {
          throw new Error('Cliente não possui ID válido');
        }
        return cliente.id;
      }),
      catchError(err => {
        console.error('Erro ao buscar cliente por CPF:', err);
        return throwError(() => new Error('Cliente não encontrado'));
      })
    );
  }

}
