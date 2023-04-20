import { Component, OnInit } from '@angular/core';
import Campania, { Estado, Programa_Sector } from 'src/app/Interfaces/Campania.interface';
import { CampaignControlServiceService } from 'src/app/Services/campaign-control-service.service';
import { UserControlService } from '../../Services/user-control.service';
import Usuario from 'src/app/Interfaces/Usuario.interface';

@Component({
  selector: 'app-desastres-naturales',
  templateUrl: './desastres-naturales.page.html',
  styleUrls: ['./desastres-naturales.page.scss'],
})
export class DesastresNaturalesPage implements OnInit {

  DisasterCampaigns: Campania[] = []
  AllCampaigns: Campania[] = []
  nomInst : any[] = [];

  constructor(
    private campaignC : CampaignControlServiceService,
    private userC : UserControlService,
  ) {}

  ngOnInit() {
    this.campaignC.getCampaigns().subscribe(
      _campaigns => {
        this.AllCampaigns = _campaigns;
        this.DisasterCampaigns = this.AllCampaigns.filter(f => f.strPrograma_Sector_Campania === Programa_Sector.Siniestro);
        this.DisasterCampaigns = this.DisasterCampaigns.filter(f => f.strEstado_Campania === 'Vigente');

        this.DisasterCampaigns.forEach(d => {
          let nameInst ;

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
