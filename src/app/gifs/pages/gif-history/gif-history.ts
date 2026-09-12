import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GifsService } from '../../services/gifs.service';
import { GifList } from "../../components/gif-list/gif-list";

@Component({
  selector: 'app-gif-history',
  imports: [GifList],
  templateUrl: './gif-history.html',
})
export default class GifHistory {
  /* este es un observable de tipo promise que me permite recibir los parametros de la ruta
  query = inject(ActivatedRoute).params.subscribe((params) => {
    console.log(params['query']);
n
  });*/


  gifService = inject(GifsService)

  // transformacion de un Observable a un Signal con toSignal y luego con la inyeccion
  // de dependencias obtenemos el valor del param 'query' que viene de la url gracias al ActivatedRoute
  // y por ultimo usamos pipe con map para extraer el valor del param 'query' y con el toSignal lo convertimos a Signal.
  query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])));


  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  });





}
