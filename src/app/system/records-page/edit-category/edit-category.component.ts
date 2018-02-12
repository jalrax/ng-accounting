import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Category} from '../../shared/models/category.model';
import {CategoriesService} from '../../shared/services/categories.service';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'sert-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Output() categoryEdit = new EventEmitter<Category>();
  form: FormGroup;

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'capacity': new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }

  onSubmit() {
    const formData = this.form.value;
    const category = new Category(formData.name, formData.capacity, +this.currentCategoryId);
    this.categoriesService.updateCategory(category)
      .subscribe((categoryStream: Category) => {
        this.categoryEdit.emit(categoryStream);
        this.message.text = 'Category has been changed';
        window.setTimeout(() => this.message.text = '', 5000);
      });
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(cat => cat.id === +this.currentCategoryId);
  }
}
