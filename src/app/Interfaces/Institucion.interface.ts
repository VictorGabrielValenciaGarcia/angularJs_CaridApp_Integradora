export default interface Institucion {
  // $key?: string,
  // id?:number,

  arrCentros_Acopio_Institucion: [],
  arrCorreos_Institucion : [
    {
      strCorreo_Departamento : string,
      strDepartamento : string,
      strEncargado_Departamento : string,
      strTelefono_Departamento : string,
    }
  ],
  boolVerificado_Institucion: boolean,
  mapRedes_Sociales_Institucion : {
    strFacebook : "",
    strInstagram : "",
    strTwitter : "",
  },
  strCorreo_Institucion : string,
  strFoto_Perfil_Institucion : string,
  strNombre_Institucion : string,
  strPassword_Institucion : string,
  strRFC_Institucion : string,
  strTelefono_Institucion : string,
  strUsername_Institucion : string,
}
