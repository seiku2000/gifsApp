import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gif-history',
  imports: [],
  templateUrl: './gif-history.html',
})
export default class GifHistory {
  /* este es un observable de tipo promise que me permite recibir los parametros de la ruta
  query = inject(ActivatedRoute).params.subscribe((params) => {
    console.log(params['query']);

  });*/
  query = toSignal(inject(ActivatedRoute).params)


}
