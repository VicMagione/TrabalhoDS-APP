import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

// Importações do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { Conta } from '../../models/conta';
import { ContasService } from '../../services/contas.service';
import { SaldoService } from '../../services/saldo.service';

@Component({
  selector: 'app-consultar-clientes',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,],
  templateUrl: './consultar-minhas-contas.component.html',
  styleUrls: ['./consultar-minhas-contas.component.css']
})
export class ConsultarMinhasContasComponent {
  contas: Conta[] = [];
  displayedColumns: string[] = ['id', 'numero', 'saldo', 'limite', 'chavePIX', 'acoes'];
    saldoTotal$ = this.saldoService.saldoTotal$;
  constructor(private clienteService: ClienteService, 
    private router: Router,
    private loginService: LoginService,
    private saldoService: SaldoService,
  private contasService: ContasService) { }

  ngOnInit(): void {
    this.carregarConta();
    this.carregarSaldoDoCliente();
  }

  

 excluirConta(id: number): void {
    const dadosToken = this.loginService.extrairDadosToken();
    const role = dadosToken.roles.replace(/ROLE_/,'');
    console.log('Dados do token:', dadosToken); 
    console.log('Nível de acesso:', dadosToken?.roles); // Agora usando 'roles'

    // Verifique se o usuário tem a role 'ADMIN'
    if (role !== 'ADMIN') { 
        alert('Apenas administradores podem excluir contas.');
        return;
    }

    if (confirm('Tem certeza que deseja excluir esta conta?')) {
        this.clienteService.excluir(id).subscribe({
            next: () => {
                alert('Conta excluída com sucesso!');
                this.carregarConta();
            },
            error: (err) => {
                alert('Erro ao excluir: ' + (err.error?.message || err.statusText));
            }
        });
    }
}

  carregarConta(): void {
     const dadosToken = this.loginService.extrairDadosToken();
    const clienteCpf = Number(dadosToken.sub);

    this.contasService.listarContasInd(clienteCpf).subscribe(contas => {
      this.contas = contas;
    });
  }

  carregarSaldoDoCliente(): void {
    const dadosToken = this.loginService.extrairDadosToken();
    const clienteCpf = Number(dadosToken.sub); 

    this.contasService.getSaldoTotalPorCliente(clienteCpf).subscribe({
      next: (saldo) => {
        this.saldoService.atualizarSaldoTotal(saldo);
      },
      error: (err) => console.error('Erro ao carregar saldo:', err)
    });
  }
}
