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

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
