export default interface Avatar {
  id?:string,
  strNombre_Avatar : string,
  strDescripcion_Avatar : string,
  strImagen_Avatar : string,

  str_Rareza_Avatar : 'Común' | 'Especial' | 'Épica' | 'Legendaria',
  numPrecio_Avatar ?: number,
}

