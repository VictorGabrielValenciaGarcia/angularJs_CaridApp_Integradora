import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.page.html',
  styleUrls: ['./campaign.page.scss'],
})
export class CampaignPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal | undefined;
  @ViewChild('modalReport') modalReport!: ModalController;
  @ViewChild('modalEconomicSupport') modalEconomicSupport!: IonModal;
  @ViewChild('modalPhysicSupport') modalPhysicSupport!: IonModal;

  objCampaingExample = {
    id: 1,
    imgBanner: './assets/Images/Examples/exampleCampaign.jpg',
    strNombreCampania: 'ComiPett',
    strOrganizacion: 'Anima International',
    strPrograma: 'PettRescue',
    strDescripcion: 'Una colaboración entre Anima Denmark y Open Cages (“Jaulas Abiertas”), Anima International trabaja en nueve países europeos. Juntos, promueven leyes que luchan contra el tratamiento cruel de los animales en las granjas industriales. Fueron nombrados “Top Charity” por Animal Charity Evaluators en 2019. Su visión es la de un futuro libre de crueldad para las industrias de la comida y de la moda.',
    objFechaInicio: {
      diaInicio: '01',
      mesInicio: '12',
      anioInicio: 2022
    },
    objFechaFin: {
      diaFin: 25,
      mesFin: '02',
      anioFin: 2023
    },
    objListaEnceres: [
      {
        strProducto: 'Donacion economica',
        strClasificacion: 'logo-usd',
        strObservaciones: 'Transferencia electronica, donacion al centro de acopio',
      },
      {
        strProducto: 'Donacion economica',
        strClasificacion: 'logo-usd',
        strObservaciones: 'Transferencia electronica, donacion al centro de acopio',
      },
      {
        strProducto: 'Donacion economica',
        strClasificacion: 'logo-usd',
        strObservaciones: 'Transferencia electronica, donacion al centro de acopio',
      },
      {
        strProducto: 'Donacion economica',
        strClasificacion: 'logo-usd',
        strObservaciones: 'Transferencia electronica, donacion al centro de acopio',
      },
      {
        strProducto: 'Donacion economica',
        strClasificacion: 'logo-usd',
        strObservaciones: 'Transferencia electronica, donacion al centro de acopio',
      },
    ]
  }

  now = new Date();
  today = new Date();
  until = new Date(this.now.getFullYear() + 10, this.now.getMonth());

  verDescription : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  modalReportDismiss(){
    this.modalReport.dismiss()
  }

  showEconomicSuppor(){
    this.modalEconomicSupport?.present()
  }

  EconomicSupportDismiss(){
    this.modalEconomicSupport.dismiss()
  }

  showPhysicSupport(){
    this.modalPhysicSupport?.present()
  }

  PhysicSupportDismiss(){
    this.modalPhysicSupport.dismiss()
  }

  // Elementos

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} carácteres disponibles`;
  }

}