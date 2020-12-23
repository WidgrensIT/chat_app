import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AvatarModule } from 'ngx-avatar';

import { MessagesPageRoutingModule } from './messages-routing.module';

import { MessagesPage } from './messages.page';
import { MenuComponent } from './menu/menu.component';
import { JoinerPipe } from '../../../pipes/joiner.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AvatarModule,
        MessagesPageRoutingModule
    ],
    declarations: [MessagesPage, MenuComponent]
})
export class MessagesPageModule {}
