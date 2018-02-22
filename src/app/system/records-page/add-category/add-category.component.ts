import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'sert-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  @Output() categoryAdd = new EventEmitter<Category>();
  form: FormGroup;
  sub1: Subscription;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'capacity': new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  onSubmit() {
    const formData = this.form.value;
    this.sub1 = this.categoriesService.addCategory(formData)
      .subscribe((category: Category) => {
        this.form.reset();
        this.categoryAdd.emit(category);
      });
  }

}
