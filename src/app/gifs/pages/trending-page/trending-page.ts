import { AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
//import { GifList } from "../../components/gif-list/gif-list";
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/scroll-state.service';




@Component({
  selector: 'app-trending-page',
  // imports: [GifList],
  templateUrl: './trending-page.html',
  styleUrl: './trending-page.css',
})
export default class TrendingPage implements AfterViewInit {

  //public imageUrls = signal<string[]>([]);

  //creamos una instancia de GifsService de la cual vamos a usar su metodo loadTrendingGifs
  public gifService = inject(GifsService);
  // gifs = computed(() => this.gifService.trendingGifs());

  public scrollStateService = inject(ScrollStateService)

  //esto como un referencia como querySelector ,pero especifico de angular y mas seguro
  scrollDivRef = viewChild<ElementRef>('groupDiv');//viewChild me devuelve un objeto con la propiedad nativeElement que me da acceso al elemento html

  //esto se ejecuta cuando la vista ha sido inicializada
  ngAfterViewInit(): void {
    const scrollDiv: HTMLDivElement | undefined = this.scrollDivRef()?.nativeElement;// ViewChild es una funcion que me permite obtener una referencia a un elemento del template, en este caso el div con la id "groupDiv"

    if (!scrollDiv) return;
    //toma el valor de scrolltop y lo guarda en el signal
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState()


  }
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
    //console.log({ isAtBottom });
    //console.log({ scrollTotal, scrollHeight });

    // guardamos el estado del scroll
    this.scrollStateService.stateScrollPage(scrollTop);

    // si esta en el bottom cargamos mas gifs
    if (isAtBottom) {

      this.gifService.loadTrendingGifs();

    }

  }





}
