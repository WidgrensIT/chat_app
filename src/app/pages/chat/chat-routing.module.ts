import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPage } from './chat.page';

import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: ChatPage,
        canActivate: [AuthGuard]
    },
    {
        path: 'messages',
        loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChatPageRoutingModule {}
