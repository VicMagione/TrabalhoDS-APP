import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';


// Importações do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { Conta } from '../../models/conta';
import { ContasService } from '../../services/contas.service';
import { SaldoService } from '../../services/saldo.service';

@Component({
  selector: 'app-consultar-clientes',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule,
    MatIconModule, MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    FormsModule,],
  templateUrl: './consultar-minhas-contas.component.html',
  styleUrls: ['./consultar-minhas-contas.component.css']
})
export class ConsultarMinhasContasComponent {
  contas: Conta[] = [];
  displayedColumns: string[] = ['id', 'numero', 'saldo', 'limite', 'chavePIX', 'acoes'];
  saldoTotal$ = this.saldoService.saldoTotal$;
  contaSelecionada: any;
  novoLimite: number = 0;
  novaChavePix: string = '';
  chavePixExistente = false;
  validandoChavePix = false;

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
    const role = dadosToken.roles.replace(/ROLE_/, '');
    console.log('Dados do token:', dadosToken);
    console.log('Nível de acesso:', dadosToken?.roles); // Agora usando 'roles'

    // Verifique se o usuário tem a role 'ADMIN'
    if (role !== 'ADMIN') {
      alert('Apenas administradores podem excluir contas.');
      return;
    }

    if (confirm('Tem certeza que deseja excluir esta conta?')) {
      this.contasService.excluir(id).subscribe({
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
  selecionarConta(conta: any): void {
    this.contaSelecionada = conta;
    this.novoLimite = conta.limite;
    this.novaChavePix = conta.chavePIX;
  }
  atualizarLimite(): void {
    if(this.contaSelecionada.limite>=this.novoLimite){
      alert('Limite não pode ser menor que o atual.');
      return;
    }
    this.contasService.atualizarLimite(this.contaSelecionada.id, this.novoLimite)
      .subscribe(() => {
        this.carregarConta();
        this.contaSelecionada = null; 
      });
  }

  // Método para atualizar chave PIX
  atualizarChavePix(): void {
    if (this.chavePixExistente) {
      alert('Esta chave PIX já está cadastrada para outra conta!');
      return;
    }

    this.contasService.atualizarChavePix(this.contaSelecionada.id, this.novaChavePix)
      .subscribe({
        next: () => {
          this.carregarConta();
          this.contaSelecionada = null;
        },
        error: (err) => {
          alert('Chave Pix ja existente.');
        }
      });
  }

  verificarChavePixUnica() {
    if (!this.novaChavePix) return;

    this.validandoChavePix = true;
    this.contasService.verificarChavePixExistente(this.novaChavePix)
      .subscribe({
        next: (existe) => {
          this.chavePixExistente = existe;
          this.validandoChavePix = false;
        },
        error: () => {
          this.validandoChavePix = false;
        }
      });
  }

}
