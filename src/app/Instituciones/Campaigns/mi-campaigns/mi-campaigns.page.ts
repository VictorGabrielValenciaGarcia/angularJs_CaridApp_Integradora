import { Component, OnInit } from '@angular/core';
import Campania from 'src/app/Interfaces/Campania.interface';

@Component({
  selector: 'app-mi-campaigns',
  templateUrl: './mi-campaigns.page.html',
  styleUrls: ['./mi-campaigns.page.scss'],
})
export class MiCampaignsPage implements OnInit {

  constructor() { }

  allCampaigns : Campania[] = [];
  animalCampaigns : Campania[] = [];
  socialCampaigns : Campania[] = [];
  disasterCampaigns : Campania[] = [];

  campaignsType = [
    {
      value: 'all',
      name: 'Todas',
    },
    {
      value: 'animals',
      name: 'Apoyo Animal',
    },
    {
      value: 'social',
      name: 'Apoyo Social',
    },
    {
      value: 'natural',
      name: 'Desastres Naturales',
    },
  ]

  filterTerm: string = '';

  ngOnInit() {
  }

}
