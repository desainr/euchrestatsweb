import {NgModule} from '@angular/core';
import {GameLogComponent} from './game-log/game-log.component';
import {BrowserModule} from "@angular/platform-browser";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {StatsComponent} from './stats/stats.component';
import {MatTableModule} from "@angular/material/table";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {GameFormComponent} from './game-form/game-form.component';
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MapViewComponent } from './map-view/map-view.component';
import {GoogleMapsModule} from '@angular/google-maps';
import {MatSnackBarModule, MatSnackBarRef} from "@angular/material/snack-bar";
import { ErrorListComponent } from './error-list/error-list.component';

@NgModule({
  declarations: [
    GameLogComponent,
    StatsComponent,
    GameFormComponent,
    ErrorListComponent,
    MapViewComponent
  ],
  imports: [
    BrowserModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule,
    MatIconModule,
    MatBottomSheetModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule,
    GoogleMapsModule,
  ],
  providers: [
    {provide: MatBottomSheetRef, useValue: {}},
    {provide: MAT_BOTTOM_SHEET_DATA, useValue: {}},
  ],
  exports: [GameLogComponent, StatsComponent, GameFormComponent, MapViewComponent]
})
export class ComponentsModule {

}
