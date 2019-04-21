import { NgModule } from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';

import {
  MatSelectModule,
  MatAutocompleteModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatRadioModule,
  MatInputModule,
  MatRippleModule,
  MatPaginatorModule ,
  MatTableModule
} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {DndModule} from 'ng2-dnd';


@NgModule({
  exports: [
    MatTableModule,
    CdkTableModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatRadioModule,
    MatInputModule,
    MatRippleModule,
    MatExpansionModule,
    DndModule,
    MatPaginatorModule
  ]
})
export class MaterialComponentsModule { }
