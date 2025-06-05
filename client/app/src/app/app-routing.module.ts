import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'inseredados',
    loadChildren: () =>
      import('./pages/inseredados/inseredados.module').then(
        (m) => m.InseredadosPageModule
      ),
  },
  {
    path: 'editperfil',
    loadChildren: () => import('./pages/editarperfil/editperfil/editperfil.module').then( m => m.EditperfilPageModule)
  },
  {
    path: 'create-workout-plan',
    loadChildren: () => import('./pages/create-workout-plan/create-workout-plan.module').then( m => m.CreateWorkoutPlanPageModule)
  },
  {
    path: 'criar-exercicio',
    loadChildren: () => import('./pages/criar-exercicio/criar-exercicio.module').then( m => m.CriarExercicioPageModule)
  },
  {
    path: 'plano-detalhe-page/:id',
    loadChildren: () => import('./pages/plano-detalhe-page/plano-detalhe-page.module').then( m => m.PlanoDetalhePagePageModule)
  },  {
    path: 'criar-projeto',
    loadChildren: () => import('./pages/criar-projeto/criar-projeto.module').then( m => m.CriarProjetoPageModule)
  },
  {
    path: 'projeto-evolucao',
    loadChildren: () => import('./pages/projeto-evolucao/projeto-evolucao.module').then( m => m.ProjetoEvolucaoPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
