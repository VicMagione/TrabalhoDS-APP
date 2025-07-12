// lancamentos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lancamentos } from '../models/lancamentos';
import { appSettings } from '../app.config';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {
  private apiUrl = `${appSettings.apiBaseUrl}/lancamentos`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  listarPorConta(contaId: number): Observable<Lancamentos[]> {
    return this.http.get<Lancamentos[]>(`${this.apiUrl}/conta/${contaId}`, this.loginService.gerarCabecalhoHTTP());
  }
}