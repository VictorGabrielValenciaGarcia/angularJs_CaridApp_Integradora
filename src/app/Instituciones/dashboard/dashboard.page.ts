import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  type: string = "";

  interactionsInst : any = [
    {
      image: './assets/Images/allCampaings.webp',
      title : 'Todas las Campañas',
      route : './campaigns/desastres-naturales',
    },
    {
      image: './assets/Images/myCampaings.webp',
      title : 'Mis Campañas',
      route : './mi-campaigns',
    },
    {
      image: './assets/Images/myCenters.webp',
      title : 'Mis Centros de Acopio',
      route : './mi-centers',
    },
  ]

  constructor(
    private ar : ActivatedRoute,
    private router : Router,
  ) { }

  ngOnInit() {
    this.ar.params.subscribe(
      (_url:any)=>{
        this.type = _url.type;
      }
    )
  }

  goToRoute(_route : string){
    this.router.navigate([_route])
  }

}
