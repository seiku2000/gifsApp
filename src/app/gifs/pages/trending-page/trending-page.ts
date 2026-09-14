import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifsService } from '../../services/gifs.service';




@Component({
  selector: 'app-trending-page',
  // imports: [GifList],
  templateUrl: './trending-page.html',
})
export default class TrendingPage {

  //public imageUrls = signal<string[]>([]);

  //creamos una instancia de GifsService de la cual vamos a usar su metodo loadTrendingGifs
  public gifService = inject(GifsService);
  // gifs = computed(() => this.gifService.trendingGifs());

  //esto como un referencia como querySelector ,pero especifico de angular y mas seguro
  scrollDivRef = viewChild<ElementRef>('groupDiv');//viewChild me devuelve un objeto con la propiedad nativeElement que me da acceso al elemento html

  public onScroll(event: Event) {
    //console.log(event);

    const scrollDiv: HTMLDivElement | undefined = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) return;

    //scrollTop es cuanto bajamos desde el inicio  hasta el final
    //clientHeight es la altura de la pantalla
    //scrollHeight es la altura total  del limite del scroll mas lo que no se ve
    const { scrollTop, clientHeight, scrollHeight } = scrollDiv
    //console.log({ scrollTop });
    //console.log({ clientHeight });
    // console.log({ scrollHeight });

    let isAtBottom = scrollTop + clientHeight + 200 >= scrollHeight
    console.log({ isAtBottom });
    //console.log({ scrollTotal, scrollHeight });

  }





}
