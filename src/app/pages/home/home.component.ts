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

  constructor(private saldoService: SaldoService,
    private loginService: LoginService,
    private clienteService: ClienteService,
    private contaService: ContasService
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


  carregarSaldoDoCliente(): void {
    const dadosToken = this.loginService.extrairDadosToken();
    const clienteId = Number(dadosToken.sub); // Assume que 'sub' contém o ID do cliente

    this.contaService.getSaldoTotalPorCliente(clienteId).subscribe({
      next: (saldo) => {
        this.saldoService.atualizarSaldoTotal(saldo);
      },
      error: (err) => console.error('Erro ao carregar saldo:', err)
    });
  }
}
