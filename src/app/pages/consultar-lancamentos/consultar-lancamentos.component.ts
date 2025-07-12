// consultar-lancamentos.component.ts
import { Component, OnInit } from '@angular/core';
import { Lancamentos } from '../../models/lancamentos';
import { LancamentosService } from '../../services/lancamentos.service';
import { ContasService } from '../../services/contas.service';
import { Conta } from '../../models/conta';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-consultar-lancamentos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './consultar-lancamentos.component.html',
  styleUrl: './consultar-lancamentos.component.css'
})
export class ConsultarLancamentosComponent implements OnInit {
  lancamentos: Lancamentos[] = [];
  contas: Conta[] = [];
  contaSelecionada: number | null = null;
  displayedColumns: string[] = ['id', 'valor', 'tipo', 'operação'];

  constructor(
    private lancamentosService: LancamentosService,
    private contasService: ContasService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.carregarContasCliente();
  }

  carregarContasCliente(): void {
    const clienteCpf = this.loginService.getClienteCpfFromToken();
    if (clienteCpf) {
      this.contasService.listarContasPorCpf(Number(clienteCpf)).subscribe(contas => {
        this.contas = contas;
        if (contas.length > 0) {
          this.contaSelecionada = contas[0].id!;
          this.carregarLancamentos();
        }
      });
    }
  }

  carregarLancamentos(): void {
    if (this.contaSelecionada) {
      this.lancamentosService.listarPorConta(this.contaSelecionada).subscribe(lancamentos => {
        this.lancamentos = lancamentos;
      });
    }
  }

  onContaChange(): void {
    this.carregarLancamentos();
  }
}