import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Conta } from '../models/conta';
import { appSettings } from '../app.config';
import { LoginService } from './login.service';
import { Cliente } from '../models/cliente';
import { ClienteService } from './cliente.service';

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  private apiUrl = `${appSettings.apiBaseUrl}/contas`;

  constructor(private http: HttpClient, private loginService: LoginService
    , private clienteService: ClienteService
  ) { }

  listar(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.apiUrl, this.loginService.gerarCabecalhoHTTP());
  }

  listarContasInd(clienteCpf: number): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${this.apiUrl}/cliente/cpf/${clienteCpf}`, this.loginService.gerarCabecalhoHTTP());
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
  atualizarLimite(id: number, novoLimite: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/limite`, { limite: novoLimite }, this.loginService.gerarCabecalhoHTTP());
  }

  atualizarChavePix(id: number, chavePix: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/chave-pix`, { chavePIX: chavePix }, this.loginService.gerarCabecalhoHTTP());
  }

  listarContasPorCpf(cpf: number): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${this.apiUrl}/cliente/cpf/${cpf}`, this.loginService.gerarCabecalhoHTTP());
  }

  verificarChavePixExistente(chavePix: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificar-chave-pix/${encodeURIComponent(chavePix)}`);
  }

  getSaldoTotalPorCliente(clienteId: number): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/cliente/cpf/${clienteId}/saldo-total`,
      this.loginService.gerarCabecalhoHTTP()
    );
  }

  criarContaParaClienteLogado(): Observable<Conta> {
    const cpf = this.loginService.getClienteCpfFromToken();
    if (!cpf) return throwError(() => new Error('CPF não encontrado'));

    return this.http.post<Conta>(
      `${this.apiUrl}`,
      { cliente: { cpf } },
      this.loginService.gerarCabecalhoHTTP()
    ).pipe(
      catchError(err => {
        console.error('Erro na requisição:', err);
        return throwError(() => new Error('Falha ao criar conta. Verifique permissões.'));
      })
    );
  }

  realizarSaque(contaId: number, valor: number): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${contaId}/saque`,
      { valor },
      this.loginService.gerarCabecalhoHTTP()
    ).pipe(
      catchError(err => {
        console.error('Erro ao realizar saque:', err);
        return throwError(() => new Error(err.error?.message || 'Erro ao realizar saque'));
      })
    );
  }
  realizarDeposito(contaId: number, valor: number): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${contaId}/deposito`,
      { valor },
      this.loginService.gerarCabecalhoHTTP()
    ).pipe(
      catchError(err => {
        console.error('Erro ao realizar deposito:', err);
        return throwError(() => new Error(err.error?.message || 'Erro ao realizar deposito'));
      })
    );
  }
}
