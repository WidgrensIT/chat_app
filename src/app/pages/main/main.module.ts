import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AvatarModule } from 'ngx-avatar';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AvatarModule,
        MainPageRoutingModule
    ],
    declarations: [MainPage]
})
export class MainPageModule {}
