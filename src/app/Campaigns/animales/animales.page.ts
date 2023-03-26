import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Campania, { Estado, Programa_Sector } from 'src/app/Interfaces/Campania.interface';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
})
export class AnimalesPage implements OnInit {

  Campaigns: Campania[] = [
    {
      id: 1,
      arrCentros_Acopio_Campania : [1,2,3],
      arrLista_Enseres_Campania : [
        {
          strClasificacion: 'Dinero en efectivo',
          strRequisitos: 'Transferencia electronica, donacion al centro de acopio',
          strNombre_Enser: 'Donacion economica',
        },
        {
          strClasificacion: 'Dinero en efectivo',
          strRequisitos: 'Transferencia electronica, donacion al centro de acopio',
          strNombre_Enser: 'Donacion economica',
        },
        {
          strClasificacion: 'Dinero en efectivo',
          strRequisitos: 'Transferencia electronica, donacion al centro de acopio',
          strNombre_Enser: 'Donacion economica',
        },
      ],
      strFecha_Inicio_Campania : '23 feb 2023',
      strFecha_Fin_Campania : '23 mar 2023',
      numCantidad_Amonestaciones_Campania : 0,
      numCantidad_Reportes : 0,
      numId_Institucion : 1,
      strDescripcion_Campania : 'Una colaboración entre Anima Denmark y Open Cages (“Jaulas Abiertas”), Anima International trabaja en nueve países europeos. Juntos, promueven leyes que luchan contra el tratamiento cruel de los animales en las granjas industriales. Fueron nombrados “Top Charity” por Animal Charity Evaluators en 2019. Su visión es la de un futuro libre de crueldad para las industrias de la comida y de la moda.',
      strEstado_Campania : Estado.Vigente,
      strNombre_Campania : 'ComiPett',
      strPrograma_Sector_Campania : Programa_Sector.Animal,
      strImage_Campania : './assets/Images/Examples/exampleCampaign.jpg',
    },
    {
      id: 2,
      arrCentros_Acopio_Campania : [4,5,6],
      arrLista_Enseres_Campania : [
        {
          strNombre_Enser: 'Comida enlatada',
          strClasificacion: 'Alimento enlatado',
          strRequisitos: 'Todo tipo de comida contenida en latas para su correcta conserva',
        },
        {
          strNombre_Enser: 'Comida enlatada',
          strClasificacion: 'Alimento enlatado',
          strRequisitos: 'Todo tipo de comida contenida en latas para su correcta conserva',
        },
        {
          strNombre_Enser: 'Comida enlatada',
          strClasificacion: 'Alimento enlatado',
          strRequisitos: 'Todo tipo de comida contenida en latas para su correcta conserva',
        },
      ],
      strFecha_Inicio_Campania : '23 feb 2023',
      strFecha_Fin_Campania : '23 feb 2023',
      numCantidad_Amonestaciones_Campania : 0,
      numCantidad_Reportes : 0,
      numId_Institucion : 2,
      strDescripcion_Campania : 'Estamos comprometidas y comprometidos al fin sostenible del hambre en el mundo. En 12 países de África, Asia y Latinoamérica trabajamos para terminar con el hambre y la pobreza a través del empoderamiento las personas rurales, especialmente mujeres, para que lleven vidas autosuficientes, satisfagan sus necesidades básicas y construyan un mejor futuro para sus hijos.',
      strEstado_Campania : Estado.Vigente,
      strNombre_Campania : 'THE HUNGER PROJECT',
      strPrograma_Sector_Campania : Programa_Sector.Social,
      strImage_Campania : './assets/Images/Examples/comidaCuadrado.jpeg',
    },
    {
      id: 3,
      arrCentros_Acopio_Campania : [7,8,9],
      arrLista_Enseres_Campania : [
        {
          strClasificacion : 'Ropa de primera y segunda mano',
          strNombre_Enser : 'Playeras, pantalones, sueteres, gorros, guantes',
          strRequisitos : 'En buen estado, sin roturas ni remiendo.',
        }
      ],
      strFecha_Fin_Campania : '23 feb 2023',
      strFecha_Inicio_Campania : '23 feb 2023',
      numCantidad_Amonestaciones_Campania : 0,
      numCantidad_Reportes : 1,
      numId_Institucion : 3,
      strDescripcion_Campania : 'La campaña «We take it back - Reciclamos tu ropa» tiene por objetivo dar un paso más hacia la circularidad en el mundo de la moda. Su dinámica se centra en evitar la generación de residuos de dos formas. La primera, dando una nueva vida a los productos recolectados que aún se pueden reutilizar. Y la segunda, reciclando aquellos productos que ya no están en condiciones para volver a ser usados.',
      strEstado_Campania : Estado.Desactivada,
      strNombre_Campania : 'WE TAKE IT BACK: !RECICLA TU ROPA!',
      strPrograma_Sector_Campania : Programa_Sector.Social,
      strImage_Campania : './assets/Images/Examples/mascotasBanner.jpeg',
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
