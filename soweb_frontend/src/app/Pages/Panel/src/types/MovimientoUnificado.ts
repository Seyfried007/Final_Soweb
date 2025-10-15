export interface MovimientoUnificado {
  id: string;
  productoNombre: string;
  productoSKU: string;
  productoIsos?: string[];
  estado: string;
  codigoVenta: string;
  costo: number;
  fecha: string;
  persona: string;

  productId: string;
  type: 'entry' | 'exit';
  quantity: number;
  reason: string;
  reference: string;
  userId: string;
  createdAt: string;
  cost?: number;
}
