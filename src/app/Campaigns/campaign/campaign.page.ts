import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import Campania, { Estado, Programa_Sector } from '../../Interfaces/Campania.interface';

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
    };

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
    this.objCampaingExample.arrLista_Enseres_Campania.forEach(element => {
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
