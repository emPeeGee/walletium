import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { Category } from '../../models/category.model';
import { RootState } from '../../store';
import { loadAllCategories } from '../../store/categories/categories.actions';
import { selectAllCategories, selectCategoriesPending } from '../../store/categories/categories.selectors';
import { CategorySaveModalComponent } from '../category-save-modal/category-save-modal.component';
import * as categoriesActions from '../../store/categories/categories.actions';
import { ComponentLoaderService } from 'src/app/core/services/others/component-loader.service';
import { ImageViewerComponent } from 'src/app/shared/components/image-viewer/image-viewer.component';
import { OpenType } from 'src/app/core/enums/open-type.enum';
import { CloseType } from 'src/app/core/enums/close-type.enum';
@Component({
  selector: 'wal-categories-layout',
  templateUrl: './categories-layout.component.html',
  styleUrls: ['./categories-layout.component.scss']
})
export class CategoriesLayoutComponent implements OnInit {
  isPending$: Observable<boolean> | null = null;
  categories$: Observable<Category[]> | null = null;

  constructor(
    private store: Store<RootState>,
    private dialog: MatDialog,
    private componentLoader: ComponentLoaderService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadAllCategories());

    this.isPending$ = this.store.select(selectCategoriesPending);
    this.categories$ = this.store.select(selectAllCategories);
  }

  addCategory(): void {
    this.dialog.open(CategorySaveModalComponent, {
      data: { type: OpenType.ADD }
    });
  }

  editCategory(category: Category): void {
    this.dialog.open(CategorySaveModalComponent, {
      data: { type: OpenType.EDIT, category }
    });
  }

  onDelete(categoryId: string): void {
    const confirmDialog = this.dialog.open(ConfirmModalComponent);
    confirmDialog.afterClosed().subscribe((CLOSE_FLAG: CloseType) => {
      if (CLOSE_FLAG === CloseType.CONFIRM) {
        this.store.dispatch(categoriesActions.deleteCategory({ categoryId }));
      }
    });
  }

  loadImageViewer(imagePath: string): void {
    this.componentLoader.showImageViewerComponent(ImageViewerComponent, imagePath);
  }
}
