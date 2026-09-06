import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { GifList } from "../../components/gif-list/gif-list";
@Component({
  selector: 'app-search-page',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, GifList],
  templateUrl: './search-page.html',
})
export default class SearchPage {

  // public serchGifs = signal([])

  public onSearch(query: string) {
    console.log(query);
  }
}
