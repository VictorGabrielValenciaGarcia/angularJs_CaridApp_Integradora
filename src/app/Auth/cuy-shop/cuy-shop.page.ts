import { Component, OnInit } from '@angular/core';
import Avatar from 'src/app/Interfaces/Avatar.interface';
import Usuario from 'src/app/Interfaces/Usuario.interface';
import { AvatarControlService } from 'src/app/Services/avatar-control.service';
import { SesionControlService } from 'src/app/Services/sesion-control.service';
import { UserControlService } from 'src/app/Services/user-control.service';

@Component({
  selector: 'app-cuy-shop',
  templateUrl: './cuy-shop.page.html',
  styleUrls: ['./cuy-shop.page.scss'],
})
export class CuyShopPage implements OnInit {

  user !: Usuario;

  allCuys : Avatar[] = [];
  userCuys : any = [];
  existe : boolean = false ;

  myCuys : Avatar[] = [];
  userProfile : string = '';
  userPoints : number = 0;

  cuysRestantes : Avatar[] = [];

  constructor(
    private userS : UserControlService,
    private avatarS : AvatarControlService,
    private sessionS : SesionControlService,
  ) {


    this.userS.getUser(this.sessionS.getCurrenUser()).subscribe(
      _user => {
        this.user = _user;
        this.userProfile = this.user.strFoto_Perfil;
        this.userPoints = this.user.numCuy_Puntos_Usuario!;
        this.userCuys = this.user.arrAvatares;

        this.avatarS.getAvatars().subscribe(
          (_avatars : Avatar[]) => {
            this.allCuys = _avatars;

            this.userCuys.forEach((avatar:any) => {
              this.existe = this.myCuys.some(f => f.id === avatar);

              if(!this.existe){
                let cuyFound = this.allCuys.find(f => f.id === avatar);
                this.myCuys.push(cuyFound!);
                this.allCuys = this.allCuys.filter(f => f.id !== avatar);
                this.cuysRestantes = this.allCuys;
              }
            });
            this.allCuys = this.cuysRestantes;
          }
        )
      }
    )





  }

  ngOnInit() {
  }

}
