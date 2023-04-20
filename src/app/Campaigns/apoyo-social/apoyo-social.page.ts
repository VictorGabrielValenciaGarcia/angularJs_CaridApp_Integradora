import { Component, OnInit } from '@angular/core';
import Campania, { Estado, Programa_Sector } from 'src/app/Interfaces/Campania.interface';
import Usuario from 'src/app/Interfaces/Usuario.interface';
import { CampaignControlServiceService } from 'src/app/Services/campaign-control-service.service';
import { UserControlService } from 'src/app/Services/user-control.service';

@Component({
  selector: 'app-apoyo-social',
  templateUrl: './apoyo-social.page.html',
  styleUrls: ['./apoyo-social.page.scss'],
})
export class ApoyoSocialPage implements OnInit {

  SocialCampaigns: Campania[] = [];
  AllCampaigns: Campania[] = [];
    nomInst : any[] = [];

  constructor(
    private campaignC : CampaignControlServiceService,
    private userC : UserControlService,
  ) {}

  ngOnInit() {
    this.campaignC.getCampaigns().subscribe(
      _campaigns => {
        this.AllCampaigns = _campaigns;
        this.SocialCampaigns = this.AllCampaigns.filter(f => f.strPrograma_Sector_Campania === Programa_Sector.Social);
        this.SocialCampaigns = this.SocialCampaigns.filter(f => f.strEstado_Campania === 'Vigente');

        this.SocialCampaigns.forEach(d => {
          this.userC.getUser(d.numId_Institucion).subscribe(
            (_user : Usuario) => {
              // console.log(_user.strNombre_Institucion);
              this.nomInst.push(_user.strNombre_Institucion)
            }
          )
        });

      }
    )
  }

}
