import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import Campania, { Estado } from 'src/app/Interfaces/Campania.interface';
import { AlertsToastServiceService } from 'src/app/Services/alerts-toast-service.service';
import { CampaignControlServiceService } from 'src/app/Services/campaign-control-service.service';

@Component({
  selector: 'app-campaign-ticket',
  templateUrl: './campaign-ticket.component.html',
  styleUrls: ['./campaign-ticket.component.scss'],
})
export class CampaignTicketComponent implements OnInit {

  @Input() campaign:any;

  constructor(
    private asc:ActionSheetController,
    private router : Router,
    private alertS : AlertsToastServiceService,
    private campaignS : CampaignControlServiceService
  ) {}

  ngOnInit() {
  }

  async campaignInteraction(){
    const acs = await this.asc.create({
      header: '¿Qué acciones desea realizar?',
      subHeader : '- '+this.campaign.strNombre_Campania+' -',
      mode: 'ios',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Consultar Detalles',
          icon: 'eye',
          handler: () => {
            this.goToDetails(this.campaign.id);
          }
        },
        {
          text: 'Editar Información',
          icon: 'pencil',
          handler: () => {
            this.goToEdit(this.campaign.id);
          }
        },
        {
          text: 'Eliminar Centro',
          icon: 'trash',
          handler: () => {
            this.deleteCampaign(this.campaign);
          }
        },

        {
          text: 'Cancelar',
          role:'cancel',
          icon: 'close',
        },

      ]
    })
    await acs.present();
  }

  goToDetails(_id : string){
    console.log(_id);
    this.router.navigate(['/campaign-details/', _id]);
  }

  goToEdit(_id : string){
    console.log(_id);
    this.router.navigate(['/create-campaigns/', _id]);
  }

  deleteCampaign(_campaign : Campania){
    console.log(_campaign);
    this.alertS.confirm('Eliminar','¿Deseas eliminar a ' + _campaign.strNombre_Campania + ' de la Lista?').then(
      async (resp:any) => {
        if(resp.data === true){

          const response = await this.campaignS.deleteCampaign(_campaign);
          this.alertS.deleteToast('Mis Campañas');
          // this.centersMap.panTo({lat: this.mapS.locations[0], lng: this.mapS.locations[1]});

        }
      }
    );
  }

}
