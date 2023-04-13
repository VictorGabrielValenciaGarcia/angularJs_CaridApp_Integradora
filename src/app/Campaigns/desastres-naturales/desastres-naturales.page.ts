import { Component, OnInit } from '@angular/core';
import Campania, { Estado, Programa_Sector } from 'src/app/Interfaces/Campania.interface';
import { CampaignControlServiceService } from 'src/app/Services/campaign-control-service.service';

@Component({
  selector: 'app-desastres-naturales',
  templateUrl: './desastres-naturales.page.html',
  styleUrls: ['./desastres-naturales.page.scss'],
})
export class DesastresNaturalesPage implements OnInit {

  DisasterCampaigns: Campania[] = []
  AllCampaigns: Campania[] = []

  constructor(
    private campaignC : CampaignControlServiceService,
  ) {
    this.campaignC.getCampaigns().subscribe(
      _campaigns => {
        this.AllCampaigns = _campaigns;
        this.DisasterCampaigns = this.AllCampaigns.filter(f => f.strPrograma_Sector_Campania === Programa_Sector.Siniestro);
      }
    )
  }

  ngOnInit() {
  }

}
