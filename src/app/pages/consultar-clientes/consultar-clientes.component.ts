import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultar-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultar-clientes.component.html',
  styleUrls: ['./consultar-clientes.component.css']
})
export class ConsultarClientesComponent {
  clientes: Cliente[] = [];

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
