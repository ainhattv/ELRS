import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { ChatComponent } from './chat/chat.component';
import { NebularModule } from '@app/nebular.module';
import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule, NebularModule, FormsModule],
  declarations: [LoaderComponent, ChatComponent, MessageComponent],
  exports: [LoaderComponent, ChatComponent, MessageComponent],
})
export class SharedModule {}
