import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifsService } from '../../../services/gifs.service';

interface MenuOptions {
  icon: string,
  label: string,
  route: string,
  subLabel: string,
}


@Component({
  selector: 'app-side-menu-options',
  styleUrl: './side-menu-options.css',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
})
export class SideMenuOptions {

  public menuOptions: MenuOptions[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Top Gifs',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      subLabel: 'Search your gifs',
      route: '/dashboard/search'

    }
  ]


  public searchHistoryService = inject(GifsService);

  // public searchHistory = computed(() => this.searchHistoryService.searchHistoryKeys());



  constructor() {
    // console.log(this.searchHistory)

  }





  //public 
}
