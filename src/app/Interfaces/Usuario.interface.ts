export default interface Usuario{

  uid ?: string,

  rotullus: 'Carid-Admin' | 'Carid-Inst' | 'Carid-User',

  // Atributos Universales o Duplicados

  mapNombre ?: {
    strNombre ?: string,
    strApellido_Paterno ?: string,
    strApellido_Materno ?: string,
  },

  strFoto_Perfil:string,
  strPassword:string,
  strUsername:string,
  strCorreo:string,
  strTelefono:string,

  // Usuario Normal

  numEdad_Usuario?:number,

  mapDireccion_Usuario ?:{
    strColonia?:string,
    strCalle?:string,
    numNumero_Casa?:number,
    numCP?:string,
  }

  numCuy_Puntos_Usuario?:number,
  arrAvatares ?: string[],

  // Instituciones
  boolVerificado_Institucion?: boolean,

  arrCentros_Acopio_Institucion ?: [],
  arrCorreos_Institucion ?: [
    {
      strCorreo_Departamento ?: string,
      strDepartamento ?: string,
      strEncargado_Departamento ?: string,
      strTelefono_Departamento ?: string,
    }
  ],

  mapRedes_Sociales_Institucion ?: {
    strFacebook ?: "",
    strInstagram ?: "",
    strTwitter ?: "",
  },
  strNombre_Institucion ?: string,
  strRFC_Institucion ?: string,

}
