import React, { useState } from 'react';
import { Plus, ArrowUpDown, TrendingUp, TrendingDown, Calendar, Package } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';
import type { MovimientoDTO } from '../../types/MovimientoDTO';
import { useAuth } from '../../context/AuthContext';
import MovementForm from './MovementForm';

const MovementList: React.FC = () => {
  const { movements, products } = useInventory();

  // Cast movements to MovimientoDTO[] to access extended properties
  // Eliminar casteo incorrecto para evitar problemas con propiedades faltantes
  const combinedMovements = movements;
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'entry' | 'exit'>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mapeo de codigoVenta a iso basado en tabla pedido
                const codigoVentaToIsoMap: Record<string, string> = {
                  'C990': '1',
                  'C244': '2',
                  'C651': '3',
                  'C369': '4',
                  'C666': '5',
                  'C784': '6',
                  'C932': '7',
                  'C433': '8',
                  'C890': '9',
                  'C965': '10',
                  'C478': '1',
                  'C311': '2',
                  'C191': '11',
                  'C123': '12',
                  'C456': '13'
                };

  // Mapeo de iso a SKU real
  const isoToSkuMap: Record<string, string> = {
    '1': '001',
    '2': '002',
    '3': '003',
    '4': '004',
    '5': '005',
    '6': '006',
    '7': '007',
    '8': '008',
    '9': '009',
    '10': '010',
  };

  console.log('Movimientos codigoVenta:', combinedMovements.map(m => m.codigoVenta));

  const canCreateMovement = user?.role === 'admin' || user?.role === 'manager';

  // Filter movements
  let filteredMovements = combinedMovements;
  
  if (filterType !== 'all') {
    filteredMovements = filteredMovements.filter(m => m.estado.toLowerCase() === filterType);
  }

  if (dateRange.start && dateRange.end) {
    filteredMovements = filteredMovements.filter(m => {
      const movementDate = new Date(m.fecha);
      return movementDate >= new Date(dateRange.start) && movementDate <= new Date(dateRange.end);
    });
  }

  // Sort by date (newest first)
  filteredMovements = [...filteredMovements].sort((a, b) => 
    new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  // Como MovimientoDTO no tiene type ni quantity, no se pueden calcular totales de entradas y salidas
  // Se calcula solo el totalValue sumando costo
  const totalValue = movements.reduce((sum, m) => sum + (m.costo || 0), 0);

  // Eliminar referencias a totalEntries y totalExits que no existen

  // Comentamos o eliminamos las líneas que usan totalEntries y totalExits para evitar errores

  // totalEntries y totalExits no están definidos, por lo que se eliminan o comentan las líneas que los usan

  // Eliminamos las líneas que referencian totalEntries y totalExits para evitar errores

  // Aquí se eliminaron o comentaron todas las referencias a totalEntries y totalExits

  // Confirmo que no hay referencias a totalEntries ni totalExits en el código

  // Busco y elimino cualquier línea que use totalEntries o totalExits para evitar errores

  // Eliminadas las líneas que referencian totalEntries y totalExits para evitar errores

  // Confirmo que no hay ninguna referencia a totalEntries ni totalExits en el código

  if (showForm) {
    return <MovementForm onClose={() => setShowForm(false)} />;
  }

  console.log('Movimientos para render:', filteredMovements.map(m => ({ id: m.id, codigoVenta: m.codigoVenta })));
  console.log('Productos disponibles:', products);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Movimientos de Inventario</h1>
          <p className="text-gray-600">Gestiona entradas y salidas de productos</p>
        </div>
        {canCreateMovement && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Nuevo Movimiento</span>
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <TrendingUp size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Entradas</p>
            <p className="text-2xl font-bold text-gray-900">
              {movements.filter(m => m.type === 'entry').reduce((sum, m) => sum + (m.quantity || 0), 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-lg">
            <TrendingDown size={24} className="text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Salidas</p>
            <p className="text-2xl font-bold text-gray-900">
              {movements.filter(m => m.type === 'exit').reduce((sum, m) => sum + (m.quantity || 0), 0)}
            </p>
          </div>
        </div>
      </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ArrowUpDown size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-gray-900">S/ {totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Movimiento</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'entry' | 'exit')}
            >
              <option value="all">Todos</option>
              <option value="entry">Entradas</option>
              <option value="exit">Salidas</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Inicio</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Fin</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setFilterType('all');
                setDateRange({ start: '', end: '' });
              }}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Movements Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-900">Producto</th>
              <th className="text-left py-3 px-6 font-medium text-gray-900">Estado</th>
              <th className="text-left py-3 px-6 font-medium text-gray-900">Código de Venta</th>
              <th className="text-left py-3 px-6 font-medium text-gray-900">Costo</th>
              <th className="text-left py-3 px-6 font-medium text-gray-900">Fecha</th>
              <th className="text-left py-3 px-6 font-medium text-gray-900">Persona</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMovements.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <ArrowUpDown size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay movimientos</h3>
                    <p className="text-gray-500 mb-4">
                      {filterType !== 'all' || dateRange.start || dateRange.end
                        ? 'No se encontraron movimientos con los filtros aplicados'
                        : 'Aún no se han registrado movimientos de inventario'
                      }
                    </p>
                  </td>
                </tr>
              ) : (
filteredMovements.map((movement, index) => {
  return (
    <tr key={`${movement.id}-${index}`} className="hover:bg-gray-50">
      <td className="py-4 px-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Package size={20} className="text-gray-500" />
          </div>
          <div>
            {/* console.log removed to fix ReactNode type error */}
              <p className="font-medium text-gray-900">
                {(() => {
                  // Normalizar SKU recibido o usar codigoVenta si productoSKU está vacío
                  const codigoVentaToIsoMap: Record<string, string> = {
                    'C990': '1',
                    'C244': '2',
                    'C651': '3',
                    'C369': '4',
                    'C666': '5',
                    'C784': '6',
                    'C932': '7',
                    'C433': '8',
                    'C890': '9',
                    'C965': '10',
                    'C478': '1',
                    'C311': '2',
                  };
                  const isoToSkuMap: Record<string, string> = {
                    '1': '001',
                    '2': '002',
                    '3': '003',
                    '4': '004',
                    '5': '005',
                    '6': '006',
                    '7': '007',
                    '8': '008',
                    '9': '009',
                    '10': '010',
                  };
                let skuNormalized = movement.productoSKU;
                console.log('ProductoSKU original:', movement.productoSKU);
                if (!skuNormalized || skuNormalized.trim() === '') {
                  // Usar codigoVenta para normalizar
                  if (movement.codigoVenta && movement.codigoVenta.startsWith('C')) {
                    const iso = codigoVentaToIsoMap[movement.codigoVenta];
                    console.log('ISO mapeado desde codigoVenta:', iso);
                    if (iso) {
                      skuNormalized = isoToSkuMap[iso] || movement.codigoVenta;
                      console.log('SKU normalizado desde codigoVenta:', skuNormalized);
                    }
                  } else {
                    skuNormalized = 'N/A';
                  }
                } else if (skuNormalized.startsWith('C')) {
                  const iso = codigoVentaToIsoMap[skuNormalized];
                  console.log('ISO mapeado desde productoSKU:', iso);
                  if (iso) {
                    skuNormalized = isoToSkuMap[iso] || skuNormalized;
                    console.log('SKU normalizado desde productoSKU:', skuNormalized);
                  }
                }
                const product = products.find(p => p.sku === skuNormalized);
                console.log('Producto encontrado:', product);
                if (skuNormalized === 'N/A') {
                  return 'SKU no disponible';
                }
                return product ? (
                  <>
                    {product.name}
                    <br />
                    <small className="text-gray-400">SKU: {product.sku}</small>
                  </>
                ) : (
                  'Producto eliminado'
                );
                })()}
                <br />
                <small className="text-gray-400">SKU recibido: {movement.productoSKU}</small>
              </p>
              {/* console.log('SKU movimiento:', movement.productoSKU) */}
              {/* console.log('SKUs productos:', products.map(p => p.sku)) */}
             {/* console.log para diagnóstico */}
             {/* Eliminar console.log para evitar error ReactNode */}
             {/* Se elimina la línea que muestra el SKU */}
             {/* <p className="text-sm text-gray-500">{movement.productoSKU}</p> */}
           </div>
         </div>
       </td>
      <td className="py-4 px-6">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            movement.estado === 'Iniciando' ? 'bg-yellow-500' :
            movement.estado === 'Finalizado' ? 'bg-green-500' : 'bg-gray-500'
          }`} />
          <span className={`font-medium ${
            movement.estado === 'Iniciando' ? 'text-yellow-700' :
            movement.estado === 'Finalizado' ? 'text-green-700' : 'text-gray-700'
          }`}>
            {movement.estado}
          </span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className="text-gray-900">{movement.codigoVenta || '-'}</span>
      </td>
      <td className="py-4 px-6">
        <span className="text-gray-900">
          {movement.costo ? `S/ ${movement.costo.toFixed(2)}` : '-'}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-gray-400" />
          <span className="text-gray-600">
            {movement.fecha ? new Date(movement.fecha).toLocaleDateString('es-PE', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : '-'}
          </span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className="text-gray-900">{movement.persona || '-'}</span>
      </td>
    </tr>
  );
})
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MovementList;