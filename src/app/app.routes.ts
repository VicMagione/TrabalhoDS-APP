import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CadastrarClienteComponent } from './pages/cadastrar-clientes/cadastrar-clientes.component';
import { ConsultarClientesComponent } from './pages/consultar-clientes/consultar-clientes.component';
import { LoginComponent } from './pages/login/login.component';
import { ConsultarContasComponent } from './pages/consultar-contas/consultar-contas.component';
import { ConsultarMinhasContasComponent } from './pages/consultar-minhas-contas/consultar-minhas-contas.component';
import { ConsultarLancamentosComponent } from './pages/consultar-lancamentos/consultar-lancamentos.component';
import { ConsultarAcessosComponent } from './pages/consultar-acessos/consultar-acessos.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cadastrar', component: CadastrarClienteComponent },
  { path: 'cadastrar/:id', component: CadastrarClienteComponent },
  { path: 'consultar', component: ConsultarClientesComponent },
  { path: 'contas', component: ConsultarContasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'minhascontas', component: ConsultarMinhasContasComponent },
  { path: 'lancamentos', component: ConsultarLancamentosComponent },
  { path: 'acessos', component: ConsultarAcessosComponent },
  { path: '', component: LoginComponent }
];
