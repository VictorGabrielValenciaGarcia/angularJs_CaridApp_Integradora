import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  type: string = "";

  interactions : any = [
    {
      image: './assets/Images/allCampaings.png',
      title : 'Todas las Campañas',
      route : './campaigns/desastres-naturales',
    },
    {
      image: './assets/Images/myCampaings.png',
      title : 'Solo mis Campañas',
      route : './mi-campaigns',
    },
    {
      image: './assets/Images/myCenters.png',
      title : 'Mis Centros de Acopio',
      route : './mi-centers',
    },
  ]

  constructor(
    private ar : ActivatedRoute,
    private router : Router,
  ) {

    this.ar.params.subscribe(
      (_url:any)=>{
        this.type = _url.type;
      }
    )

  }

  ngOnInit() {
  }

  goToRoute(_route : string){
    this.router.navigate([_route])
  }

}