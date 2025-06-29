import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  nivel = 'ADMIN';

  menu = [
    { descricao: 'Consultar Clientes', rota: '/consultar', niveis: ['ADMIN', 'GESTOR', 'CLIENTE'] },
    { descricao: 'Cadastrar Clientes', rota: '/cadastrar', niveis: ['ADMIN', 'GESTOR'] }
  ];
  constructor(private loginService: LoginService){}

  ngOnInit(): void {
  const dadosToken = this.loginService.extrairDadosToken();
  console.log(dadosToken);

  if (dadosToken && dadosToken.roles) {
    // Remove "ROLE_" com a expressão regular /ROLE_/ 
    this.nivel = dadosToken.roles.replace(/ROLE_/,'');
  } else {
    console.warn('Não foi possível determinar o nível do usuário a partir do token.');
  }
}

}
