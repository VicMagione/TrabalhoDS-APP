// saldo.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContasService } from './contas.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {
  private saldoTotalSource = new BehaviorSubject<number>(0);
  saldoTotal$ = this.saldoTotalSource.asObservable();

  constructor(
    private contasService: ContasService,
    private loginService: LoginService
  ) {}

  carregarSaldoInicial(): void {
    const clienteId = this.loginService.getClienteIdFromToken();
    if (clienteId) {
      this.contasService.getSaldoTotalPorCliente(clienteId).subscribe({
        next: (saldo) => this.atualizarSaldoTotal(saldo),
        error: (err) => console.error('Erro ao carregar saldo:', err)
      });
    }
  }

  atualizarSaldoTotal(saldo: number): void {
    this.saldoTotalSource.next(saldo);
  }
}