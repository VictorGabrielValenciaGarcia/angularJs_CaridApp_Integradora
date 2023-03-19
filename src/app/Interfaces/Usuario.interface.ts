export default interface Usuario{
    // $key?: string,
    // id?:number,
    mapNombre_Usuario : {
      strNombre:string,
      strApellido_Paterno:string,
      strApellido_Materno:string,
    },
    numEdad_Usuario:number,
    mapDireccion_Usuario :{
      strColonia:string,
      strCalle:string,
      numNumero_Casa:number,
      numCP:string,
    }
    strTelefono_Usuario:string,
    strCorreo_Usuario:string,
    strUsername_Usuario:string,
    strPassword_Usuario:string,
    strFoto_Perfil_Usuario:string,
    numCuy_Puntos_Usuario?:number,
  }
