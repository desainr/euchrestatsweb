import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ComponentsModule} from "./components/components.module";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {DatabaseService} from "../services/database.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {LocationService} from "../services/location.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatGridListModule,
    HttpClientModule,
    ComponentsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatDividerModule,
    MatTabsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
    MatSnackBarModule,
  ],
  providers: [
    DatabaseService,
    LocationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
