import { Component, OnInit } from '@angular/core';
import Campania, { Estado, Programa_Sector } from 'src/app/Interfaces/Campania.interface';
import { CampaignControlServiceService } from 'src/app/Services/campaign-control-service.service';

@Component({
  selector: 'app-apoyo-social',
  templateUrl: './apoyo-social.page.html',
  styleUrls: ['./apoyo-social.page.scss'],
})
export class ApoyoSocialPage implements OnInit {

  SocialCampaigns: Campania[] = []
  AllCampaigns: Campania[] = []

  constructor(
    private campaignC : CampaignControlServiceService,
  ) {
    this.campaignC.getCampaigns().subscribe(
      _campaigns => {
        this.AllCampaigns = _campaigns;
        this.SocialCampaigns = this.AllCampaigns.filter(f => f.strPrograma_Sector_Campania === Programa_Sector.Social);
      }
    )
  }

  ngOnInit() {
  }

}
