import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';
import { Product } from '../../types';

interface ProductFormProps {
  productId?: string | null;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ productId, onClose }) => {
  const { products, addProduct, updateProduct } = useInventory();

  interface ProductFormData extends Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'stock' | 'minStock' | 'maxStock' | 'location' | 'supplierId' | 'unit'> {
    clientType: string;
    category: string;
    palabras: string;
    estadoPedido: string;
  }

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    sku: '',
    description: '',
    price: 0,
    clientType: '',
    category: '',
    palabras: '',
    estadoPedido: 'Iniciando',
    estadoSolicitud: 'Pendiente',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!productId;
  const product = isEditing ? products.find(p => p.id === productId) : null;

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        description: product.description,
        price: product.price,
        clientType: '', // Map from product if available
        category: product.category,
        palabras: '',
        estadoPedido: product.estadoPedido || 'Iniciando',
        estadoSolicitud: product.estadoSolicitud || 'Pendiente',
      });
    }
  }, [product]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.sku.trim()) newErrors.sku = 'El SKU es requerido';
    if (!formData.category.trim()) newErrors.category = 'La especialización es requerida';
    if (formData.price <= 0) newErrors.price = 'El precio debe ser mayor a 0';
    if (!formData.clientType) newErrors.clientType = 'Debe seleccionar un cliente';
    if (!formData.estadoPedido.trim()) newErrors.estadoPedido = 'El estado de pedido es requerido';
    if (!formData.estadoSolicitud.trim()) newErrors.estadoSolicitud = 'El estado de solicitud es requerido';

    // Check if SKU is unique (only for new products or if SKU changed)
    if (!isEditing || (product && product.sku !== formData.sku)) {
      const existingSku = products.find(p => p.sku === formData.sku);
      if (existingSku) newErrors.sku = 'Este SKU ya existe';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // Create a full product object with default values for omitted fields
    const productToSave = {
      ...formData,
      stock: 0,
      minStock: 0,
      maxStock: 0,
      location: '',
      supplierId: '',
      unit: '',
    };

    if (isEditing && productId) {
      updateProduct(productId, productToSave);
    } else {
      addProduct(productToSave);
    }

    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const especializaciones = [
    'Calidad en procesos y productos',
    'Medio ambiente y sostenibilidad',
    'Salud ocupacional y seguridad laboral',
    'Industria alimentaria y cadenas de suministro',
    'Protección de datos y ciberseguridad',
    'Calidad en productos médicos y sanitarios',
    'Laboratorios científicos y técnicos',
    'Eficiencia energética y consumo responsable',
    'Prevención y gestión de riesgos organizacionales',
    'Ética empresarial y prevención de corrupción'
  ];

  const estadosPedido = ['Iniciando', 'Proceso', 'Finalizado'];

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
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
            </h1>
            <p className="text-gray-600">
              {isEditing ? 'Modifica la información del producto' : 'Agrega un nuevo producto al inventario'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información Básica */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Ej: ISO 27001"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU *
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.sku ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Ej: C001"
                />
                {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Descripción del producto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cliente *
                </label>
                <select
                  name="clientType"
                  value={formData.clientType}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.clientType ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar cliente</option>
                  <option value="Boleta">Boleta</option>
                  <option value="Factura">Factura</option>
                </select>
                {errors.clientType && <p className="text-red-500 text-sm mt-1">{errors.clientType}</p>}
              </div>
            </div>

            {/* Especialización y Palabras */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Especialización y Palabras</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especialización *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar especialización</option>
                  {especializaciones.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palabras *
                </label>
                <input
                  type="text"
                  name="palabras"
                  value={formData.palabras}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.palabras ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Ej: A1-B2"
                />
                {errors.palabras && <p className="text-red-500 text-sm mt-1">{errors.palabras}</p>}
              </div>
            </div>

            {/* Estado Pedido y Estado Solicitud */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado Pedido y Estado Solicitud</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado Pedido *
                </label>
                <select
                  name="estadoPedido"
                  value={formData.estadoPedido}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.estadoPedido ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar estado</option>
                  <option value="Iniciando">Iniciando</option>
                  <option value="Proceso">Proceso</option>
                  <option value="Finalizado">Finalizado</option>
                </select>
                {errors.estadoPedido && <p className="text-red-500 text-sm mt-1">{errors.estadoPedido}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado de Solicitud *
                </label>
                <select
                  name="estadoSolicitud"
                  value={formData.estadoSolicitud}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.estadoSolicitud ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar estado</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Activo">Activo</option>
                  <option value="Aprobado">Aprobado</option>
                </select>
                {errors.estadoSolicitud && <p className="text-red-500 text-sm mt-1">{errors.estadoSolicitud}</p>}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <X size={16} />
                <span>Cancelar</span>
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Save size={16} />
                <span>{isEditing ? 'Guardar Cambios' : 'Crear Produto'}</span>
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default ProductForm;
