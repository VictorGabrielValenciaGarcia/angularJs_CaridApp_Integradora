import { Component, OnInit } from '@angular/core';
import Campania, { Estado, Programa_Sector } from 'src/app/Interfaces/Campania.interface';
import Usuario from 'src/app/Interfaces/Usuario.interface';
import { CampaignControlServiceService } from 'src/app/Services/campaign-control-service.service';
import { UserControlService } from 'src/app/Services/user-control.service';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
})
export class AnimalesPage implements OnInit {

  AnimalCampaigns: Campania[] = []
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
        this.AnimalCampaigns = this.AllCampaigns.filter(f => f.strPrograma_Sector_Campania === Programa_Sector.Animal);

        this.AnimalCampaigns.forEach(d => {
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
