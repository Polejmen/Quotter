import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Category, CategoryService,} from '../services/categories/categories.service';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ModalController} from "@ionic/angular";
import {firstValueFrom} from "rxjs";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  categories: Category[] = [];
  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private categoryService: CategoryService,
    private fb: FormBuilder,
  ) {
    this.form =this.fb.group({})
    firstValueFrom(this.categoryService.Categories$).then(places =>{
      this.categories = places;
      places.forEach((place, i) => {
        this.form.addControl("ch" + (i + 1), new FormControl(place.active))
      })

      this.form.valueChanges.subscribe(data => {
        this.categories.forEach((place,i)=>{
          this.categoryService.setActive(i, data["ch" + (i + 1)])
        })
      })
    })
  }
}
