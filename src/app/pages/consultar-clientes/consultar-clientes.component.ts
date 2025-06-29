import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';

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
  imports: [CommonModule,MatCardModule,MatSelectModule,
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
  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.carregarCliente();
  }

  editarCliente(funcionario: Cliente): void {
    this.router.navigate(['/clientes', funcionario.id]);
  }

  excluirCliente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.excluir(id).subscribe(() => {
        alert('Cliente excluído com sucesso!');
        this.carregarCliente();
      });
    }
  }

  carregarCliente(): void {
    this.clienteService.listar().subscribe(clientes => {
      this.clientes = clientes;
    });
  }
}
