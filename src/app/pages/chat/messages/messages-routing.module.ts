import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesPage } from './messages.page';
import { AuthGuard } from '../../../guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: MessagesPage,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MessagesPageRoutingModule {}
