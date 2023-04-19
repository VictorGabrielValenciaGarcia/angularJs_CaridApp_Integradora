import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import Usuario from 'src/app/Interfaces/Usuario.interface';
import { SesionControlService } from 'src/app/Services/sesion-control.service';
import { UserControlService } from 'src/app/Services/user-control.service';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss'],
})
export class CampaignCardComponent implements OnInit {

  @Input() campaign : any;
  @Input() nomInst : string = '';


  constructor(
    private router : Router,
    private  userC : UserControlService
  ) {}

  ngOnInit() {}

  verCampaign(_Campaña:any){
    this.router.navigate(['./campaign', _Campaña?.id]);
  }

}
