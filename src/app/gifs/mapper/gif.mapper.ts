import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interface";

export class GiphyItemMapper {
    //es un singleton porque al dia de manana cambia la forma de como me traiga la data el api 
    //entonces solo cambio en un solo lugar no en todos los lugares 

    static mapGiphyItemToGif(item: GiphyItem): Gif {
        return {
            id: item.id,
            title: item.title,
            url: item.images.original.url,
        }

    }

    static mapGiphyItemsToGifAray(items: GiphyItem[]): Gif[] {
        return items.map(item => this.mapGiphyItemToGif(item));
    }
}