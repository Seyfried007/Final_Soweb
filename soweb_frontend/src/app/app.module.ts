import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TarjetaComponent } from './Pages/tarjeta/tarjeta.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { DatePipe, DecimalPipe } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    TarjetaComponent
  ],
  providers: [DatePipe, DecimalPipe],
  bootstrap: []
})
export class AppModule { }
