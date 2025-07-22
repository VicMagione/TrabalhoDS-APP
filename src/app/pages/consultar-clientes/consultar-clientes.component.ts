import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { LoginService } from '../../services/login.service';
import { EditarClienteComponent } from '../../components/editar-cliente/editar-cliente.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskPipe } from 'ngx-mask';


@Component({
  selector: 'app-consultar-clientes',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskPipe,
    MatTableModule],
  templateUrl: './consultar-clientes.component.html',
  styleUrls: ['./consultar-clientes.component.css']
})
export class ConsultarClientesComponent {
  clientes: Cliente[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'telefone', 'acoes'];
  constructor(private clienteService: ClienteService,
    private dialog: MatDialog,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.carregarCliente();
  }

  editarCliente(cliente: Cliente): void {
    const dialogRef = this.dialog.open(EditarClienteComponent, {
      width: '500px',
      data: { cliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clienteService.atualizarCliente(cliente.cpf,result).subscribe({
          next: () => {
            alert('Cliente atualizado com sucesso!');
            this.carregarCliente();
          },
          error: (err) => {
            alert('Erro ao atualizar: ' + (err.error?.message || err.statusText));
          }
        });
      }
    });
  }

  excluirCliente(id: number): void {
    const dadosToken = this.loginService.extrairDadosToken();
    const role = dadosToken.roles.replace(/ROLE_/, '');
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
