import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'sert-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Output() categoryAdd = new EventEmitter<Category>();
  form: FormGroup;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'capacity': new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }

  onSubmit() {
    const formData = this.form.value;
    this.categoriesService.addCategory(formData)
      .subscribe((category: Category) => {
        this.form.reset();
        this.categoryAdd.emit(category);
      });
  }

}
