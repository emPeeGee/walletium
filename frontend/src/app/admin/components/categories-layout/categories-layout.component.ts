import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { RootState } from '../../store';
import { loadAllCategories } from '../../store/categories/categories.actions';
import { selectAllCategories, selectCategoriesPending } from '../../store/categories/categories.selectors';
import { CategorySaveModalComponent } from '../category-save-modal/category-save-modal.component';

@Component({
  selector: 'wal-categories-layout',
  templateUrl: './categories-layout.component.html',
  styleUrls: ['./categories-layout.component.scss']
})
export class CategoriesLayoutComponent implements OnInit {
  isPending$: Observable<boolean> | null = null;
  categories$: Observable<Category[]> | null = null;

  constructor(private store: Store<RootState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(loadAllCategories());

    this.isPending$ = this.store.select(selectCategoriesPending);
    this.categories$ = this.store.select(selectAllCategories);
  }

  addCategory(type: string): void {
    this.dialog.open(CategorySaveModalComponent, {
      data: {}
    });
  }
}
