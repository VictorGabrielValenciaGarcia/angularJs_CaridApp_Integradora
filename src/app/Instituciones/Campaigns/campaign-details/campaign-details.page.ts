import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import Campania, { Estado, Programa_Sector } from '../../../Interfaces/Campania.interface';
import { CampaignControlServiceService } from '../../../Services/campaign-control-service.service';
import { UserControlService } from 'src/app/Services/user-control.service';
import Usuario from 'src/app/Interfaces/Usuario.interface';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.page.html',
  styleUrls: ['./campaign-details.page.scss'],
})
export class CampaignDetailsPage implements OnInit {

  @ViewChild('modalReports') modalReports!: ModalController;

  campaign : any;

  checkedList : boolean[] = [];
  idCampaing : string = '';
  campaignName : string = '';
  nomInst : string = '';

  constructor(
    private router : Router,
    private ar : ActivatedRoute,
    private userC : UserControlService,
    private campaingS : CampaignControlServiceService
  ) {}

  ngOnInit() {
    this.ar.params.subscribe(
      (_id:any)=>{
        this.idCampaing = _id.id;

        this.campaingS.getCampaignById(this.idCampaing).subscribe(
          _campania => {
            this.campaign = _campania;
            this.campaignName = _campania.strNombre_Campania
            this.campaign.arrLista_Enseres_Campania.forEach((element:any) => {
            this.checkedList.push(false)
            this.userC.getUser(this.campaign?.numId_Institucion).subscribe(
              (_user : Usuario) => {
                // console.log(_user);
                this.nomInst = _user.strNombre_Institucion!;
              }
            );
          });
        });
        // console.log(this.idCampaing);
      }
    );
  }

  // Modal Interaction

  modalReportDismiss(){
    this.modalReports.dismiss()
  }

  viewMap(_id:string){
    this.router.navigate(['/check-centers/',_id]);
  }

  selectIcon (_clasificacion : string) : string {

    let icon : string = '';

    switch (_clasificacion) {

      case 'Economico':
        icon = 'cash';
        break;

      case 'Salud':
        icon = 'medkit';
        break;

      case 'Alimento':
        icon = 'fish';
        break;

      case 'Didactico':
        icon = 'dice';
        break;

      case 'Educativo':
        icon = 'library';
        break;

      case 'Vestimenta':
        icon = 'shirt';
        break;

      case 'Bienestar':
        icon = 'body';
        break;

      case 'Otro':
        icon = 'earth';
        break;

    }

    return icon;
  }

  selectColor (_clasificacion : string) : string {

    let color : string = '';

    switch (_clasificacion) {

      case 'Economico':
        color = 'success';
        break;

      case 'Salud':
        color = 'danger';
        break;

      case 'Alimento':
        color = 'warning';
        break;

      case 'Didactico':
        color = 'primary';
        break;

      case 'Educativo':
        color = 'secondary';
        break;

      case 'Vestimenta':
        color = 'tertiary';
        break;

      case 'Bienestar':
        color = 'middle';
        break;

      case 'Otro':
        color = 'dark';
        break;

    }

    return color;
  }

}

