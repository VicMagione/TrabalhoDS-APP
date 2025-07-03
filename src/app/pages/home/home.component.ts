import { Component } from '@angular/core';

// Importações do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { SaldoService } from '../../services/saldo.service';
import { CommonModule } from '@angular/common'; // Adicione esta linha
import { LoginService } from '../../services/login.service';
import { ClienteService } from '../../services/cliente.service';
import { ContasService } from '../../services/contas.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  saldoTotal$ = this.saldoService.saldoTotal$;
  nomeCliente: string = '';
  idCliente: number = 0;

  constructor(private saldoService: SaldoService,
    private loginService: LoginService,
    private clienteService: ClienteService,
    private contaService: ContasService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const clienteId = this.loginService.getClienteIdFromToken();
    if (clienteId) {
      this.clienteService.getClienteById(clienteId).subscribe(cliente => {
        this.nomeCliente = cliente.nome; // Atribui o nome do cliente
        this.carregarSaldoDoCliente();
      });
    }

  }
  // home.component.ts
  criarNovaConta(): void {
    this.contaService.criarContaParaClienteLogado().subscribe({
      next: (conta) => {
        this.snackBar.open(`Conta ${conta.numero} criada com sucesso!`, 'Fechar', { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open(`Erro: ${err.message}`, 'Fechar', { duration: 5000 });
      }
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
