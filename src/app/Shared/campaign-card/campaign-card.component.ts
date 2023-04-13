import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss'],
})
export class CampaignCardComponent implements OnInit {

  @Input() campaign : any;

  constructor(private router : Router) { }

  ngOnInit() {}

  verCampaign(_Campaña:any){
    this.router.navigate(['./campaign', _Campaña?.id]);
  }

}
