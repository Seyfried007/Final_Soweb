export interface MovimientoDTO {
  id: string;
  productoNombre: string;
  productoSKU: string;
  productoIsos?: string[];
  estado: string;
  codigoVenta: string;
  costo: number;
  fecha: string;
  persona: string;
}
