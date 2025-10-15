import React from 'react';
import { ArrowLeft, Edit2, Package, MapPin, DollarSign, AlertTriangle, Calendar, User } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

interface ProductDetailsProps {
  productId: string;
  onClose: () => void;
  onEdit?: (productId: string) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onClose, onEdit }) => {
  const { products, suppliers, movements } = useInventory();
  
  const product = products.find(p => p.id === productId);
  const supplier = product ? suppliers.find(s => s.id === product.supplierId) : null;
  const productMovements = movements.filter(m => m.productId === productId).slice(-10);

  if (!product) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Producto no encontrado</p>
        <button onClick={onClose} className="mt-4 text-blue-600 hover:underline">
          Volver
        </button>
      </div>
    );
  }

  const getStockStatus = () => {
    if (product.stock === 0) return { color: 'text-red-600', label: 'Agotado', bgColor: 'bg-red-50' };
    if (product.stock <= product.minStock) return { color: 'text-orange-600', label: 'Stock Bajo', bgColor: 'bg-orange-50' };
    if (product.stock >= product.maxStock) return { color: 'text-blue-600', label: 'Stock Alto', bgColor: 'bg-blue-50' };
    return { color: 'text-green-600', label: 'Normal', bgColor: 'bg-green-50' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detalles del Producto</h1>
            <p className="text-gray-600">Información completa del producto</p>
          </div>
        </div>
        
        {onEdit && (
          <button
            onClick={() => onEdit(productId)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Edit2 size={16} />
            <span>Editar</span>
          </button>
        )}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Info Card */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                <Package size={32} className="text-gray-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">SKU:</span>
                    <span className="ml-2 font-medium text-gray-900">{product.sku}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Especialización:</span>
                    <span className="ml-2 font-medium text-gray-900">{product.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Estado de Solicitud:</span>
                    <span className="ml-2 font-medium text-gray-900">{product.unit}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {product.description && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">Descripción</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign size={20} className="mr-2" />
              Precio
            </h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              S/ {(typeof product.price === 'number' ? product.price : parseFloat(product.price)).toFixed(2)}
            </div>
            <p className="text-sm text-gray-600">por {product.unit}</p>
          </div>

          {/* Client Info */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cliente</h3>
            <div className="space-y-2">
              <p className="font-medium text-gray-900">{supplier ? supplier.name : 'N/A'}</p>
              {/* Additional client info can be added here if available */}
            </div>
          </div>

          {/* Dates */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar size={20} className="mr-2" />
              Fechas
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Creado</p>
                <p className="text-sm text-gray-600">
                  {new Date(product.createdAt).toLocaleDateString('es-PE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Última Actualización</p>
                <p className="text-sm text-gray-600">
                  {new Date(product.updatedAt).toLocaleDateString('es-PE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Movements */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Movimientos Recientes</h3>
            {productMovements.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay movimientos registrados para este producto</p>
            ) : (
              <div className="space-y-3">
                {productMovements.map((movement) => (
                  <div key={movement.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        movement.type === 'entry' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">
                          {movement.type === 'entry' ? 'Entrada' : 'Salida'} - {movement.quantity} {product.unit}
                        </p>
                        <p className="text-sm text-gray-600">{movement.reason}</p>
                        {movement.reference && (
                          <p className="text-xs text-gray-500">Ref: {movement.reference}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {new Date(movement.createdAt).toLocaleDateString('es-PE')}
                      </p>
                      {movement.cost && (
                        <p className="text-sm font-medium text-gray-900">
                          S/ {movement.cost.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

