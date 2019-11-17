import { Component } from '@angular/core';
import { BasePage } from '../BasePage';

@Component({
  selector: 'app-ibu-info',
  templateUrl: './ibu-info.page.html',
  styleUrls: ['./ibu-info.page.scss'],
})
export class IbuInfoPage extends BasePage {
  constructor() { super('ibu-info'); }
}
