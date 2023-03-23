import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.page.html',
  styleUrls: ['./campaign.page.scss'],
})
export class CampaignPage implements OnInit {

  @ViewChild('modal') modal!: ModalController;
  @ViewChild('modalThanks') modalThanks!: IonModal;
  @ViewChild('modalReport') modalReport!: ModalController;
  @ViewChild('modalPhysicSupport') modalPhysicSupport!: IonModal;
  @ViewChild('modalEconomicSupport') modalEconomicSupport!: IonModal;

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

  verDescription : boolean = false;
  checkedList : boolean[] = [];

  idCampaing : string = '0';

  constructor(
    private ar : ActivatedRoute,
    private router : Router,

  ) {
    this.ar.params.subscribe(
      (_id:any)=>{
        this.idCampaing = _id.id;
        // console.log(this.idCampaing);
      }
    )
  }

  ngOnInit() {
    this.objCampaingExample.objListaEnceres.forEach(element => {
      this.checkedList.push(false)
    });
  }

  // Modal Interaction

  modalSupportDismiss(){
    this.modal.dismiss()
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

  showThanks(){
    this.modalThanks?.present()
    this.PhysicSupportDismiss();
    this.EconomicSupportDismiss();
    this.modalSupportDismiss();
  }

  ThanksDismiss(){
    this.modalThanks.dismiss()
  }

  viewMap(_id:string){
    this.modalThanks.dismiss()
    this.PhysicSupportDismiss();
    this.EconomicSupportDismiss();
    this.modalSupportDismiss();
    this.router.navigate(['/centers-map/',_id]);
  }

  // Elementos

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} carácteres disponibles`;
  }

  changeEvent(event:any, _id:number) {
    if(event.checked){
      // console.log(event.detail.checked);
      this.checkedList[_id] = event.detail.checked;
    }else{
    //  console.log(event.detail.checked);
      this.checkedList[_id] = event.detail.checked;
   }
  }

}
