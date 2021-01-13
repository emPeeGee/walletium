import { Component, Input } from '@angular/core';

@Component({
  selector: 'wal-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() public isLoading = false;
}
