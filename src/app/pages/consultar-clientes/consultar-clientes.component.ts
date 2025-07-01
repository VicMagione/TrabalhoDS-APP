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

@Component({
  selector: 'app-consultar-clientes',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule],
  templateUrl: './consultar-clientes.component.html',
  styleUrls: ['./consultar-clientes.component.css']
})
export class ConsultarClientesComponent {
  clientes: Cliente[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'telefone', 'acoes'];
  constructor(private clienteService: ClienteService, private router: Router,private loginService: LoginService) { }

  ngOnInit(): void {
    this.carregarCliente();
  }

  editarCliente(cliente: Cliente): void {
    this.router.navigate(['/clientes', cliente.id]);
  }

 excluirCliente(id: number): void {
    const dadosToken = this.loginService.extrairDadosToken();
    const role = dadosToken.roles.replace(/ROLE_/,'');
    console.log('Dados do token:', dadosToken); 
    console.log('Nível de acesso:', dadosToken?.roles); // Agora usando 'roles'

    // Verifique se o usuário tem a role 'ADMIN'
    if (role !== 'ADMIN') { 
        alert('Apenas administradores podem excluir clientes.');
        return;
    }

    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        this.clienteService.excluir(id).subscribe({
            next: () => {
                alert('Cliente excluído com sucesso!');
                this.carregarCliente();
            },
            error: (err) => {
                alert('Erro ao excluir: ' + (err.error?.message || err.statusText));
            }
        });
    }
}

  carregarCliente(): void {
    this.clienteService.listar().subscribe(clientes => {
      this.clientes = clientes;
    });
  }
}
