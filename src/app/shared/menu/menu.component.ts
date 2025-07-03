import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ClienteService } from '../../services/cliente.service';

// Angular Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  nivel = 'CLIENTE';
  nomeCliente: string = '';
  estaAutenticado = false; // Adicione esta propriedade


  menu = [
    { descricao: 'Home', rota: '/home', icone: 'home', niveis: ['ADMIN', 'GESTOR', 'CLIENTE'] },
    { descricao: 'Consultar Todas Contas', rota: '/contas', icone: 'account_balance', niveis: ['ADMIN'] },
    { descricao: 'Consultar Minhas Contas', rota: '/minhascontas', icone: 'account_balance', niveis: ['ADMIN', 'GESTOR', 'CLIENTE'] },
    { descricao: 'Consultar Clientes', rota: '/consultar', icone: 'people', niveis: ['ADMIN'] }
  ];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.verificarAutenticacao();
  }

  verificarAutenticacao(): void {
    this.estaAutenticado = this.loginService.estaAutenticado();

    if (this.estaAutenticado) {
      const dadosToken = this.loginService.extrairDadosToken();
      const clienteId = this.loginService.getClienteIdFromToken();

      if (dadosToken?.roles) {
        this.nivel = dadosToken.roles.replace(/ROLE_/, '');
      }

      if (clienteId) {
        this.clienteService.getClienteById(clienteId).subscribe({
          next: (cliente) => this.nomeCliente = cliente.nome,
          error: () => console.warn('Não foi possível carregar o nome do cliente')
        });
      }
    }
  }
  logout(): void {
    this.loginService.limparToken();
    this.router.navigate(['/login']).then(() => window.location.reload());
  }
}