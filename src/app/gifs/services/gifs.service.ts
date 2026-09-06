import { HttpClient } from '@angular/common/http'; // para hacer peticiones http
import { inject, Injectable, signal } from '@angular/core'; //inject: me permite inyectar dependencias, Injectable: me permite inyectar el servicio
import { environment } from '@environments/environment'; //variables de entorno
import type { Giphy } from '../interfaces/giphy.interface'; // tipado de la respuesta
import { Gif } from '../interfaces/gif.interface';
import { GiphyItemMapper } from '../mapper/gif.mapper';//este para traformar la data que solo necesitemo del api sin necesidad estar tomando todo

@Injectable({ providedIn: 'root' })
export class GifsService {



    //esto es para hacer peticiones http a la api de giphy
    private http = inject(HttpClient);
    //esto es el array de los gifs que se muestran en la pantalla
    public trendingGifs = signal<Gif[]>([]);
    //esto es para saber si esta cargando
    trendingGifsLoading = signal<boolean>(false);



    //constructor de la clase
    constructor() {
        this.loadTrendingGifs();//esto carga los gifs cuando se crea el servicio
        console.log('service constructor');
    }

    //https://api.giphy.com/v1/gifs/trending -esto me trae todos los gifs del momento
    loadTrendingGifs() {
        //aqui en vez de feth usamos httpClient que es mas eficiente y seguro
        this.http.get<Giphy>(`${environment.giphyUrl}/gifs/trending`, {//pasamos el url de la api con su key y el limite de  gifs que queremos
            //tenemos get, post, put, delete, patch que son para hacer peticiones http
            params: {
                api_key: environment.giphyKey,//para autenticarnos
                limit: 20,//para obtener los 20 gifs mas populares

            },
        }).subscribe((resp: Giphy) => {//es subscribe para obtener la respuesta de la peticion http
            // console.log(resp);
            const gifs = GiphyItemMapper.mapGiphyItemsToGifAray(resp.data);//mapeamos la respuesta
            this.trendingGifs.set(gifs);//establecemos los gifs en el signal
            this.trendingGifsLoading.set(false);
            console.log(gifs);
        })


    }
}