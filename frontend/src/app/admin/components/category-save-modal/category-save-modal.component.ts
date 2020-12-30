import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OpenType } from 'src/app/core/enums/open-type.enum';
import { mimeTypeValidator } from 'src/app/core/validators/mime-type.validator';
import { Category } from '../../models/category.model';
import { RootState } from '../../store';
import * as categoriesActions from '../../store/categories/categories.actions';

@Component({
  selector: 'wal-category-save-modal',
  templateUrl: './category-save-modal.component.html',
  styleUrls: ['./category-save-modal.component.scss']
})
export class CategorySaveModalComponent implements OnInit {
  isImageInputTouched = false;
  imagePreview: string | undefined;
  type: OpenType | null = null;
  category: Category | null = null;

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeTypeValidator] })
  });

  categoryCreatedSubscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CategorySaveModalComponent>,
    private store: Store<RootState>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.type = this.data.type;
    this.checkForSaveSuccess();

    this.category = this.data.category;
    if (this.category) {
      this.categoryForm.patchValue({
        name: this.category.name,
        image: this.category.imagePath
      });

      this.imagePreview = this.category.imagePath;
    }
  }

  saveCategory(): void {
    const formData = new FormData();
    formData.append('name', this.categoryForm.value.name);

    if (this.type === OpenType.ADD) {
      formData.append('categoryImage', this.categoryForm.value.image);
      this.store.dispatch(categoriesActions.createCategory({ category: formData }));
    } else if (this.type === OpenType.EDIT) {
      formData.append('categoryImage', this.categoryForm.value.image || null);
      formData.append('imagePath', this.category!.imagePath);

      this.store.dispatch(categoriesActions.editCategory({ categoryId: this.category!._id, category: formData }));
    }
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  onImagePicked(event: Event): void {
    const file: any = (event.target as HTMLInputElement).files?.item(0);
    console.log(this.image);

    this.categoryForm?.patchValue({ image: file });
    this.categoryForm?.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  onFilePickerClick(filePicker: any): void {
    this.isImageInputTouched = true;
    filePicker.click();
  }

  private checkForSaveSuccess(): void {
    this.categoryCreatedSubscription = this.actions$
      .pipe(
        ofType(categoriesActions.createCategorySuccess, categoriesActions.editCategorySuccess),
        tap(() => this.dialogRef.close())
      )
      .subscribe();
  }

  get name(): AbstractControl | null {
    return this.categoryForm.get('name');
  }

  get image(): AbstractControl | null {
    return this.categoryForm.get('image');
  }
}