import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, Observer, of, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RootState } from '../../store';
import * as categoriesActions from '../../store/categories/categories.actions';

@Component({
  selector: 'wal-category-save-modal',
  templateUrl: './category-save-modal.component.html',
  styleUrls: ['./category-save-modal.component.scss']
})
export class CategorySaveModalComponent implements OnInit {
  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl(null, [Validators.required])
  });
  imagePreview: string | undefined;

  categoryCreatedSubscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CategorySaveModalComponent>,
    private store: Store<RootState>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.checkForSaveSuccess();
  }

  saveCategory(): void {
    const formData = new FormData();

    formData.append('name', this.categoryForm.value.name);
    formData.append('categoryImage', this.categoryForm.value.image);

    this.store.dispatch(categoriesActions.createCategory({ category: formData }));
  }

  cancelDialog(): void {}

  onImagePicked(event: Event): void {
    const file: any = (event.target as HTMLInputElement).files?.item(0);

    this.categoryForm?.patchValue({ image: file });
    this.categoryForm?.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  private checkForSaveSuccess(): void {
    this.categoryCreatedSubscription = this.actions$
      .pipe(
        ofType(categoriesActions.createCategorySuccess),
        tap(() => this.dialogRef.close('success'))
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

// export const mimeType = (control: AbstractControl): Observable<{ [key: string]: any | null }> | Observable<null> => {
//   if (typeof control.value === 'string') {
//     return of(null);
//   }

//   const file = control.value as File;
//   const fileReader = new FileReader();
//   const frObs = new Observable((observer: Observer<{ [key: string]: any | null } | null>) => {
//     fileReader.addEventListener('loadend', () => {
//       const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
//       let header = '';
//       let isValid = false;
//       for (const val of arr) {
//         header += val.toString(16);
//       }

//       switch (header) {
//         case '89504e47':
//           isValid = true;
//           break;
//         case 'ffd8ffe0':
//         case 'ffd8ffe1':
//         case 'ffd8ffe2':
//         case 'ffd8ffe3':
//         case 'ffd8ffe8':
//           isValid = true;
//           break;
//         default:
//           isValid = false; // Or you can use the blob.type as fallback
//           break;
//       }

//       if (isValid) {
//         observer.next(null);
//       } else {
//         observer.next({ invalidMimeType: true });
//       }
//       observer.complete();
//     });
//     fileReader.readAsArrayBuffer(file);
//   });

//   fileReader.onloadend = () => {};

//   return frObs;
// };
