import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { objectToArrayPipe } from './pipes/objectTransformer.pipe';
import { filterPipe } from './pipes/filter.pipe';
import { extractDataService } from './services/extractData.service';
@NgModule({
  declarations: [
    AppComponent, objectToArrayPipe, filterPipe
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [extractDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
