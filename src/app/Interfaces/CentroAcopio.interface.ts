export interface Contacto {
  strCorreo : string,
  strDepartamento : string,
  strEncargado : string,
  strTelefono_Departamento : string,
}

export default interface CentroAcopio {

  id?:string,

  strNombre_CentroA:string,
  strSubtitulo_CentroA?:string,
  strImage_CentroA:string,
  numId_Institucion : string,

  mapContactos_CentroA : {
    arrCorreos_CentroA : Contacto[],
    strFacebook : string,
    strInstagram : string,
    strTelefono : string,
    strTikTok : string,
    strTwitter : string,
    strWhatsApp : string,
  },

  mapDireccion_Fisica_CentroA :{
    numCP:number,
    numNumero_Exterior:number,
    numNumero_Interior:number,
    strCalle:string,
    strCiudad:string,
    strColonia:string,
    strEstado:string,
    strMunicipio:string,
  },

  mapDireccion_GPS_CentroA :{
    longitud:number,
    latitud:number,
  },

}
