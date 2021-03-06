import {Component, OnInit} from '@angular/core';

import {Category} from '../shared/models/category.model';
import {CategoriesService} from '../shared/services/categories.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'sert-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})

export class RecordsPageComponent implements OnInit {

  categories: Category[] = [];
  isLoaded = false;

  constructor(private categoriesService: CategoriesService,
              private title: Title,
              private meta: Meta) {
    title.setTitle('Записи');
    meta.addTags([
      {name: 'keywords', content: 'записи, доход, расход'},
      {name: 'description', content: 'Страница записей'},
    ]);
  }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  newCategoryAdded(category: Category) {
    this.categories.push(category);
  }

  categoryWasEdited(category: Category) {
    const idx = this.categories
      .findIndex(cat => cat.id === category.id);
    this.categories[idx] = category;
  }
}
