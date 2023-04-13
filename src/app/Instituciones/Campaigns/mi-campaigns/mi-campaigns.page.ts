import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import Campania from 'src/app/Interfaces/Campania.interface';
import { Router } from '@angular/router';
import { CampaignControlServiceService } from 'src/app/Services/campaign-control-service.service';
import { AlertsToastServiceService } from 'src/app/Services/alerts-toast-service.service';

@Component({
  selector: 'app-mi-campaigns',
  templateUrl: './mi-campaigns.page.html',
  styleUrls: ['./mi-campaigns.page.scss'],
})
export class MiCampaignsPage implements OnInit {


  allCampaigns : Campania[] = [];
  myCampaigns : Campania[] = [];
  animalCampaigns : Campania[] = [];
  socialCampaigns : Campania[] = [];
  disasterCampaigns : Campania[] = [];

  campaignsType = [
    {
      value: 'all',
      name: 'Todas las Campañas',
      icon : 'file-tray-stacked-outline'
    },
    {
      value: 'animals',
      name: 'Apoyo Animal',
      icon : 'paw'
    },
    {
      value: 'social',
      name: 'Apoyo Social',
      icon : 'fitness'
    },
    {
      value: 'natural',
      name: 'Desastres Naturales',
      icon : 'thunderstorm'
    },
  ]

  filterTermAll : string = '';
  filterTermAnimal : string = '';
  filterTermSocial : string = '';
  filterTermDisaster : string = '';

  selectorType : string = 'all';
  titleType : string = 'Todas las Campañas';

  constructor(
    private acsC : ActionSheetController,
    private router : Router,
    private campaignsS : CampaignControlServiceService,
    private alertS : AlertsToastServiceService,
  ) {
    this.campaignsS.getCampaigns().subscribe(
      _campaigns => {
        this.allCampaigns = _campaigns;

        this.animalCampaigns = this.allCampaigns.filter(f => f.strPrograma_Sector_Campania === 'Apoyo Animal');
        this.socialCampaigns = this.allCampaigns.filter(f => f.strPrograma_Sector_Campania === 'Apoyo Social');
        this.disasterCampaigns = this.allCampaigns.filter(f => f.strPrograma_Sector_Campania === 'Desastres Naturales');

        console.log(this.animalCampaigns);
        console.log(this.socialCampaigns);
        console.log(this.disasterCampaigns);

      }
    )
  }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.selectorType = ev.detail.value;
    let typeFound = this.campaignsType.filter(f => f.value === (ev.detail.value) );
    this.titleType = typeFound[0].name;
  }
}
