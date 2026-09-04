import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

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

}
