import { HttpClient } from '@angular/common/http'; // para hacer peticiones http
import { computed, effect, inject, Injectable, signal } from '@angular/core'; //inject: me permite inyectar dependencias, Injectable: me permite inyectar el servicio
import { environment } from '@environments/environment'; //variables de entorno
import type { Giphy } from '../interfaces/giphy.interface'; // tipado de la respuesta
import { Gif } from '../interfaces/gif.interface';
import { GiphyItemMapper } from '../mapper/gif.mapper';//este para traformar la data que solo necesitemo del api sin necesidad estar tomando todo
import { map, Observable, tap } from 'rxjs';

const Gif_Key = 'searchHistory';//esta es la clave que vamos a usar para guardar el historial de busquedas en el localstorage
const loadFromLocalStorage = (): Record<string, Gif[]> => {
    const history = localStorage.getItem(Gif_Key);
    if (!history) return {};
    return JSON.parse(history);
}




@Injectable({ providedIn: 'root' })
export class GifsService {
    /*
        {
            'goku':[gifs1 ,gifs2,gifs3],
            'zelda':gifs1 ,gifs2,gifs3]
        }

        Record<string,GIF[]>
    
    */



    //esto es para hacer peticiones http a la api de giphy  
    private http = inject(HttpClient);
    //esto es el array de los gifs que se muestran en la pantalla
    public trendingGifs = signal<Gif[]>([]);//[g1,g2,g3,g4,g5,g6,g7,g8,g9]
    //esto es para saber si esta cargando
    public trendingGifsLoading = signal<boolean>(false);

    private trendingGifsPage = signal(0);

    //computed es una funcion que se ejecuta cada vez que hay un cambio en el signal trendingGifs 
    // y hace la division en grupos de 3 en 3 para que se muestren de esa forma el historial
    treadingGroup = computed<Gif[][]>(() => {//[[g1,g2,g3],[g4,g5,g6],[g7,g8,g9]]
        const groups: Gif[][] = [];
        for (let i = 0; i < this.trendingGifs().length; i += 3) {
            const group = this.trendingGifs().slice(i, i + 3);
            groups.push(group);
        }
        //console.log(groups);

        return groups;
    })



    // Record<string, Gif[]>  es un tipo de dato que permite crear un objeto que tiene como claves strings y como valores arrays de Gifs.                   
    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

    //es una funcion se ejecuta cada vez que hay un cambio en el signal searchHistory
    saveGifLocalstorage = effect(() => {
        localStorage.setItem(Gif_Key, JSON.stringify(this.searchHistory()));
    });





    //constructor de la clase
    constructor() {
        this.loadTrendingGifs();//esto carga los gifs cuando se crea el servicio
        console.log('service constructor');
    }

    //https://api.giphy.com/v1/gifs/trending -esto me trae todos los gifs del momento
    loadTrendingGifs(): void {

        if (this.trendingGifsLoading()) return;

        this.trendingGifsLoading.set(true);


        //aqui en vez de feth usamos httpClient que es mas eficiente y seguro
        this.http.get<Giphy>(`${environment.giphyUrl}/gifs/trending`, {//pasamos el url de la api con su key y el limite de  gifs que queremos
            //tenemos get, post, put, delete, patch que son para hacer peticiones http
            params: {
                api_key: environment.giphyKey,//para autenticarnos
                limit: 24,//para obtener los 20 gifs mas populares
                offset: this.trendingGifsPage() * 24,

            },
        }).subscribe((resp: Giphy) => {//es subscribe para obtener la respuesta de la peticion http
            // console.log(resp);
            const gifs = GiphyItemMapper.mapGiphyItemsToGifAray(resp.data);//mapeamos la respuesta
            //this.trendingGifs.set(gifs);//establecemos los gifs en el signal
            this.trendingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
            this.trendingGifsPage.update((page) => page + 1);
            this.trendingGifsLoading.set(false);
            //   console.log(gifs);
        });


    }
    // retornamos un observale un observable es como un flujo de datos que se puede suscribir a el.
    searchGifs(query: string): Observable<Gif[]> {
        return this.http.get<Giphy>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.giphyKey,
                limit: 20,
                q: query
            }
            //pipe me permite encadenar operadores y transformar los datos que se reciben , ejemplo si quiero que me retorne solo una propiedad del objeto que me devuelve el api
        }).pipe(
            //tab sirve para ejecutar efectos secundarios. por ejemplo llamar a otro servicio o hacer console.log
            //tap(resp => console.log({ tap: resp })),
            //tap(resp => console.log({ tap2: resp })),
            //tap(resp => console.log({ tap3: resp })),


            //los map nos permiten transformar los datos que se reciben a travez del observable.
            map(({ data }) => data), //toma solo la propiedad data del objeto que me devuelve el api
            map((items) => GiphyItemMapper.mapGiphyItemsToGifAray(items)),//transforma la data que nos devuelve el api en un array de Gifs
            //TODO:HISTORIAL DE BUSQUEDAS.

            //aqui hacemos un efecto secundario para guardar el historial de busquedas
            tap((items) => {
                //el spread operator nos permite copiar todos los elementos del objeto y agregar uno nuevo.
                this.searchHistory.update(histori => ({
                    //pasamos una copia
                    ...histori,
                    [query.toLowerCase()]: items,//le asignamos la clave del query que lo pasamos a minusculas y el valor que es el array de Gifs
                }))
            })

        )


        /*.subscribe((resp: Giphy) => {
            const gifsSearch = GiphyItemMapper.mapGiphyItemsToGifAray(resp.data);
            console.log(gifsSearch);
            // console.log(resp.data);++
        });*/
    }


    getHistoryGifs(query: string): Gif[] {
        return this.searchHistory()[query] ?? [];
    }
}

