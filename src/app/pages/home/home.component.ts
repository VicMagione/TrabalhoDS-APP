import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { SaldoService } from '../../services/saldo.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { ClienteService } from '../../services/cliente.service';
import { ContasService } from '../../services/contas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SaqueComponent } from '../../components/saque/saque.component';
import { Conta } from '../../models/conta';
import { DepositoComponent } from '../../components/deposito/deposito.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule, 
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule, 
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  saldoTotal$ = this.saldoService.saldoTotal$;
  nomeCliente: string = '';
  idCliente: number = 0;
  contas$: Observable<Conta[]>;

  constructor(
    private saldoService: SaldoService,
    private loginService: LoginService,
    private clienteService: ClienteService,
    private contaService: ContasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    const clienteCpf = this.loginService.getClienteCpfFromToken();
    this.contas$ = this.contaService.listarContasPorCpf(Number(clienteCpf));
  }

  ngOnInit(): void {
    const clienteId = this.loginService.getClienteIdFromToken();
    if (clienteId) {
      this.clienteService.getClienteById(clienteId).subscribe(cliente => {
        this.nomeCliente = cliente.nome;
        this.carregarSaldoDoCliente();
      });
    }
  }

  criarNovaConta(): void {
    this.contaService.criarContaParaClienteLogado().subscribe({
      next: (conta) => {
        this.snackBar.open(`Conta ${conta.numero} criada com sucesso!`, 'Fechar', { duration: 3000 });
        // Atualiza a lista de contas após criar uma nova
        const clienteCpf = this.loginService.getClienteCpfFromToken();
        this.contas$ = this.contaService.listarContasPorCpf(Number(clienteCpf));
      },
      error: (err) => {
        this.snackBar.open(`Erro: ${err.message}`, 'Fechar', { duration: 5000 });
      }
    });
  }

  abrirDialogoSaque(): void {
    this.contas$.subscribe(contas => {
      const dialogRef = this.dialog.open(SaqueComponent, {
        width: '400px',
        data: { contas }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Aqui você pode tratar o resultado do saque
          this.snackBar.open(`Saque realizado com sucesso!`, 'Fechar', { duration: 3000 });
          this.carregarSaldoDoCliente(); // Atualiza o saldo
        }
      });
    });
  }

  abrirDialogoDeposito(): void {
    this.contas$.subscribe(contas => {
      const dialogRef = this.dialog.open(DepositoComponent, {
        width: '400px',
        data: { contas }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.snackBar.open(`Desposito realizado com sucesso!`, 'Fechar', { duration: 3000 });
          this.carregarSaldoDoCliente(); 
        }
      });
    });
  }

  carregarSaldoDoCliente(): void {
    const dadosToken = this.loginService.extrairDadosToken();
    const clienteCpf = Number(dadosToken.sub); 

    this.contaService.getSaldoTotalPorCliente(clienteCpf).subscribe({
      next: (saldo) => {
        this.saldoService.atualizarSaldoTotal(saldo);
      },
      error: (err) => console.error('Erro ao carregar saldo:', err)
    });
  }
}