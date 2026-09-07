import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { GifList } from "../../components/gif-list/gif-list";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
@Component({
  selector: 'app-search-page',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, GifList],
  templateUrl: './search-page.html',
})
export default class SearchPage {

  // public serchGifs = signal([])
  public gifs = signal<Gif[]>([]);

  public gifSearchService = inject(GifsService);

  public onSearch(query: string) {
    // this.gifSearchService.searchGifs(query);
    //console.log(query);
    this.gifSearchService.searchGifs(query).subscribe(rest => {
      console.log(rest.data);
    })
  }
}
