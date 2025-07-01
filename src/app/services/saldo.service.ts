import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {
  private saldoTotalSource = new BehaviorSubject<number>(0);
  saldoTotal$ = this.saldoTotalSource.asObservable();

  atualizarSaldoTotal(saldo: number): void {
    this.saldoTotalSource.next(saldo);
  }
}