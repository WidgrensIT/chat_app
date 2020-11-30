import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

import { MainPage } from '../main/main.page';
import { ChatPage } from '../chat/chat.page';


const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'contacts',
                loadChildren: () => import('../main/main.module').then( m => m.MainPageModule )
            },
            {
                path: 'chat',
                loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule )
            },
            {
                path: '',
                redirectTo: '/tabs/contacts',
                pathMatch: 'full'
            }
        ],
    },
    {
        path: '',
        redirectTo: '/tabs/contacts',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {}
