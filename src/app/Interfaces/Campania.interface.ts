interface Enser {
  strClasificacion : string,
  strNombre_Enser : string,
  strRequisitos : string,
}

export enum Programa_Sector {
  Social = 'Apoyo Social',
  Animal = 'Apoyo Animal',
  Siniestro = 'Apoyo por Desastres Naturales',
}

export enum EnserCalsificacion {
  Economico = 'Economico',
  Salud = 'Salud',
  Alimento = 'Alimento',
  Didactico = 'Didactico',
  Educativo = 'Educativo',
  Vestimenta = 'Vestimenta',
  Bienestar = 'Bienestar',
  Otro = 'Otro',
}

export enum Estado {
  Vigente = 'Vigente',
  Vencida = 'Vencida',
  Desactivada = 'Desactivada',
}

export default interface Campania {

  // $key?: string,
  strImage_Campania : string,

  strNombre_Campania : string,
  strPrograma_Sector_Campania : string,
  strDescripcion_Campania : string,

  strFecha_Inicio_Campania : string,
  strFecha_Fin_Campania : string,

  arrLista_Enseres_Campania : Enser[],
  arrCentros_Acopio_Campania : number[],

  // Invisibles en el Formulario
  id?: string,
  numId_Institucion : string,

  strEstado_Campania : Estado,

  numCantidad_Amonestaciones_Campania : number,
  numCantidad_Reportes : number,

}
