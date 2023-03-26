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

export enum Estado {
  Vigente = 'Vigente',
  Vencida = 'Vencida',
  Desactivada = 'Desactivada',
}

export default interface Campania {

  // $key?: string,
  id:number,
  arrCentros_Acopio_Campania : number[],
  arrLista_Enseres_Campania : Enser[],
  strFecha_Inicio_Campania : string,
  strFecha_Fin_Campania : string,
  numCantidad_Amonestaciones_Campania : number,
  numCantidad_Reportes : number,
  numId_Institucion : number,
  strDescripcion_Campania : string,
  strEstado_Campania : Estado,
  strNombre_Campania : string,
  strPrograma_Sector_Campania : string,
  strImage_Campania : string,
}
