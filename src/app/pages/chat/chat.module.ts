import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AvatarModule } from 'ngx-avatar';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { JoinerPipe } from '../../pipes/joiner.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AvatarModule,
        ChatPageRoutingModule
    ],
    declarations: [ChatPage, JoinerPipe]
})
export class ChatPageModule {}
