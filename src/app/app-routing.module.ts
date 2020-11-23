import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
    },
    {
        path: '',
        loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
    },
    {
        path: 'signup',
        loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
    },
    {
        path: 'forgot-password',
        loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
