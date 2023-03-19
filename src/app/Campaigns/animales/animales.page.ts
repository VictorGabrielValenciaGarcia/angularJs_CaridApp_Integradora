import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface campañas {
  id: number,
  imgBanner: string,
  strNombreCampania: string,
  strOrganizacion: string,
  strPrograma?: string,
  strDescripcion: string,
  objFechaInicio: {
    diaInicio: number,
    mesInicio: string,
    añoInicio: number
  }
  objFechaFin: {
    dia_fin: number,
    mesFin: string,
    añoFin: number
  }
  objListaEnceres: {
    strProducto: string,
    strClasificacion: string,
    strObservaciones: string,
  }
}

@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
})
export class AnimalesPage implements OnInit {

  Campaigns: campañas[] = [
    {
      id: 1,
      imgBanner: './assets/Images/Examples/exampleCampaign.jpg',
      strNombreCampania: 'ComiPett',
      strOrganizacion: 'Anima International',
      strPrograma: 'PettRescue',
      strDescripcion: 'Una colaboración entre Anima Denmark y Open Cages (“Jaulas Abiertas”), Anima International trabaja en nueve países europeos. Juntos, promueven leyes que luchan contra el tratamiento cruel de los animales en las granjas industriales. Fueron nombrados “Top Charity” por Animal Charity Evaluators en 2019. Su visión es la de un futuro libre de crueldad para las industrias de la comida y de la moda.',
      objFechaInicio: {
        diaInicio: 1,
        mesInicio: 'diciembre',
        añoInicio: 2022
      },
      objFechaFin: {
        dia_fin: 25,
        mesFin: 'febrero',
        añoFin: 2023
      },
      objListaEnceres: {
        strProducto: 'Donacion economica',
        strClasificacion: 'Dinero en efectivo',
        strObservaciones: 'Transferencia electronica, donacion al centro de acopio',
      }
    },
    {
      id: 2,
      imgBanner: './assets/Images/Examples/comidaCuadrado.jpeg',
      strNombreCampania: 'THE HUNGER PROJECT',
      strOrganizacion: 'THP',
      strPrograma: 'THE HUNGER PROJECT (THP)',
      strDescripcion: 'Estamos comprometidas y comprometidos al fin sostenible del hambre en el mundo. En 12 países de África, Asia y Latinoamérica trabajamos para terminar con el hambre y la pobreza a través del empoderamiento las personas rurales, especialmente mujeres, para que lleven vidas autosuficientes, satisfagan sus necesidades básicas y construyan un mejor futuro para sus hijos.',
      objFechaInicio: {
        diaInicio: 1,
        mesInicio: 'Marzo',
        añoInicio: 2022
      },
      objFechaFin: {
        dia_fin: 1,
        mesFin: 'Marzo',
        añoFin: 2023
      },
      objListaEnceres: {
        strProducto: 'Comida enlatada',
        strClasificacion: 'Alimento enlatado',
        strObservaciones: 'Todo tipo de comida contenida en latas para su correcta conserva',
      }
    },
    {
      id: 3,
      imgBanner: './assets/Images/Examples/mascotasBanner.jpeg',
      strNombreCampania: 'WE TAKE IT BACK: !RECICLA TU ROPA!',
      strOrganizacion: 'C&A',
      strDescripcion: 'La campaña «We take it back - Reciclamos tu ropa» tiene por objetivo dar un paso más hacia la circularidad en el mundo de la moda. Su dinámica se centra en evitar la generación de residuos de dos formas. La primera, dando una nueva vida a los productos recolectados que aún se pueden reutilizar. Y la segunda, reciclando aquellos productos que ya no están en condiciones para volver a ser usados.',
      objFechaInicio: {
        diaInicio: 15,
        mesInicio: 'Abril',
        añoInicio: 2022
      },
      objFechaFin: {
        dia_fin: 12,
        mesFin: 'Abril',
        añoFin: 2025
      },
      objListaEnceres: {
        strProducto: 'Ropa de primera y segunda mano',
        strClasificacion: 'Playeras, pantalones, sueteres, gorros, guantes',
        strObservaciones: 'En buen estado, sin roturas ni remiendo.',
      }
    },
  ]

  constructor(
    private router : Router,
  ) { }

  ngOnInit() {
  }

  verCampaign(_idCampaña:number, _Campaña:any){
    this.router.navigate(['./campaign', _idCampaña]);
  }

}
