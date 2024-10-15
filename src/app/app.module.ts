import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { AppRoutingModule } from './app-routing.module'; // Import your routing module
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, ChatbotComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}
