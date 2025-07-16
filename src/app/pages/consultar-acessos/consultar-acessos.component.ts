import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { AcessosService } from '../../services/acessos.service';
import { Acesso } from '../../models/acesso';

@Component({
  selector: 'app-consultar-acessos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,],
  templateUrl: './consultar-acessos.component.html',
  styleUrls: ['./consultar-acessos.component.css']
})
export class ConsultarAcessosComponent {
  acessos: Acesso[] = [];
  displayedColumns: string[] = ['id', 'data','cliente', 'acoes'];
  constructor(
    private loginService: LoginService,
    private acessoService: AcessosService,
    private contasService: ContasService,) { }

  ngOnInit(): void {
    this.carregarAcessos();
  }



  excluirConta(id: number): void {
    const dadosToken = this.loginService.extrairDadosToken();
    const role = dadosToken.roles.replace(/ROLE_/, '');

    // Verifique se o usuário tem a role 'ADMIN'
    if (role !== 'ADMIN') {
      alert('Apenas administradores podem excluir Acesso.');
      return;
    }

    if (confirm('Tem certeza que deseja excluir esta Acesso?')) {
      this.acessoService.excluir(id).subscribe({
        next: () => {
          alert('Acesso excluída com sucesso!');
          this.carregarAcessos();
        },
        error: (err) => {
          alert('Erro ao excluir: ' + (err.error?.message || err.statusText));
        }
      });
    }
  }

  carregarAcessos(): void {
    this.acessoService.listar().subscribe(acessos => {
      this.acessos = acessos;
    });
  }
  


}
