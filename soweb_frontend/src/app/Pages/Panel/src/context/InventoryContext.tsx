import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Movement, Request, Supplier, Alert } from '../types';
import type { MovimientoUnificado } from '../types/MovimientoUnificado';

interface InventoryContextType {
  products: Product[];
  movements: MovimientoUnificado[];
  requests: Request[];
  suppliers: Supplier[];
  alerts: Alert[];
  
  // Products
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Movements
  addMovement: (movement: Omit<MovimientoUnificado, 'id' | 'createdAt'>) => void;
  
  // Requests
  createRequest: (request: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRequest: (id: string, updates: Partial<Request>) => void;
  
  // Suppliers
  addSupplier: (supplier: Omit<Supplier, 'id' | 'createdAt'>) => void;
  updateSupplier: (id: string, updates: Partial<Supplier>) => void;
  
  // Alerts
  markAlertAsRead: (id: string) => void;
  
  // Utilities
  searchProducts: (query: string) => Product[];
  generateReport: (startDate: string, endDate: string) => MovimientoUnificado[];
  exportToExcel: () => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use static products list as main source
        const staticProducts = [
          { id: '1', name: 'D122 FSSC 22000', price: 681.00, sku: '001', iso: 'ISO22000', description: '', clientType: '', category: '', palabras: '', estadoPedido: 'Iniciando', estadoSolicitud: 'Pendiente', stock: 0, minStock: 0, maxStock: 0, location: '', supplierId: '', unit: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '2', name: 'D123 Kit (V2.0)', price: 1049.00, sku: '002', iso: 'CMMI', description: '', clientType: '', category: '', palabras: '', estadoPedido: 'Iniciando', estadoSolicitud: 'Pendiente', stock: 0, minStock: 0, maxStock: 0, location: '', supplierId: '', unit: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '3', name: 'D124 Kit ISO 20121', price: 850.00, sku: '003', iso: 'ISO20121', description: '', clientType: '', category: '', palabras: '', estadoPedido: 'Iniciando', estadoSolicitud: 'Pendiente', stock: 0, minStock: 0, maxStock: 0, location: '', supplierId: '', unit: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '4', name: 'D125 Documentos NABH', price: 788.00, sku: '004', iso: 'NABH', description: '', clientType: '', category: '', palabras: '', estadoPedido: 'Iniciando', estadoSolicitud: 'Pendiente', stock: 0, minStock: 0, maxStock: 0, location: '', supplierId: '', unit: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '5', name: 'D126 ISO 13485:2016', price: 419.00, sku: '005', iso: 'ISO13485', description: '', clientType: '', category: '', palabras: '', estadoPedido: 'Iniciando', estadoSolicitud: 'Pendiente', stock: 0, minStock: 0, maxStock: 0, location: '', supplierId: '', unit: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '6', name: 'D127 SA 8000:2014 ', price: 472.00, sku: '006', iso: 'SA8000', description: '', clientType: '', category: '', palabras: '', estadoPedido: 'Iniciando', estadoSolicitud: 'Pendiente', stock: 0, minStock: 0, maxStock: 0, location: '', supplierId: '', unit: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '7', name: 'D128 Kit ISO 17024, procedimientos, lista de verificación', price: 1049.00, sku: '007', iso: 'ISO17024', description: '', clientType: '', category: '', palabras: '', estadoPedido: 'Iniciando', estadoSolicitud: 'Pendiente', stock: 0, minStock: 0, maxStock: 0, location: '', supplierId: '', unit: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '8', name: 'D129 Kit ISO 20000', price: 578.00, sku: '008', iso: 'ISO20000', description: '', clientType: '', category: '', palabras: '', estadoPedido: 'Iniciando', estadoSolicitud: 'Pendiente', stock: 0, minStock: 0, maxStock: 0, location: '', supplierId: '', unit: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '9', name: 'D130 Kit ISO/IEC 17043:2023', price: 1049.00, sku: '009', iso: 'ISO17043', description: '', clientType: '', category: '', palabras: '', estadoPedido: 'Iniciando', estadoSolicitud: 'Pendiente', stock: 0, minStock: 0, maxStock: 0, location: '', supplierId: '', unit: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '10', name: 'D131 BRC Storage', price: 473.00, sku: '010', iso: 'BRC', description: '', clientType: '', category: '', palabras: '', estadoPedido: 'Iniciando', estadoSolicitud: 'Pendiente', stock: 0, minStock: 0, maxStock: 0, location: '', supplierId: '', unit: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
        ];

        setProducts(staticProducts);
      } catch (error) {
        console.error('Error al obtener productos estáticos:', error);
      }
    };

    fetchProducts();
  }, []);

  const [movements, setMovements] = useState<MovimientoUnificado[]>([]);



  useEffect(() => {
    const fetchCombinedMovements = async () => {
      try {
        const response = await fetch('http://localhost:8080/transaccion/movimientos-combinados');
        if (!response.ok) throw new Error('Error al obtener movimientos combinados');
        const data = await response.json();
        console.log('Datos recibidos de movimientos combinados:', data);
        setMovements(data);
      } catch (error) {
        console.error('Error al obtener movimientos combinados:', error);
      }
    };

    fetchCombinedMovements();
  }, []);

  const [requests, setRequests] = useState<Request[]>([
    {
      id: '1',
      productId: '3',
      requestedBy: '3',
      quantity: 50,
      reason: 'Stock bajo en sucursal',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      name: 'Alicorp S.A.',
      contactPerson: 'Juan Pérez',
      email: 'juan.perez@alicorp.com',
      phone: '01-315-0000',
      address: 'Av. Argentina 4793, Callao',
      ruc: '20100055237',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Costeño Alimentos',
      contactPerson: 'María García',
      email: 'maria.garcia@costeno.com',
      phone: '01-428-7000',
      address: 'Av. Universitaria 1875, SMP',
      ruc: '20100049601',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Gloria S.A.',
      contactPerson: 'Carlos López',
      email: 'carlos.lopez@gloria.com.pe',
      phone: '054-201-5000',
      address: 'Av. República de Panamá 2461, La Victoria',
      ruc: '20100190797',
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'low_stock',
      productId: '3',
      message: 'Leche Gloria 1L está por debajo del stock mínimo',
      severity: 'high',
      isRead: false,
      createdAt: new Date().toISOString()
    }
  ]);

  // Check for low stock alerts
  useEffect(() => {
    const checkLowStock = () => {
      const newAlerts: Alert[] = [];
      
      products.forEach(product => {
        if (product.stock <= product.minStock) {
          const existingAlert = alerts.find(
            alert => alert.productId === product.id && alert.type === 'low_stock' && !alert.isRead
          );
          
          if (!existingAlert) {
            newAlerts.push({
              id: Date.now().toString() + product.id,
              type: product.stock === 0 ? 'out_of_stock' : 'low_stock',
              productId: product.id,
              message: `${product.name} ${product.stock === 0 ? 'está agotado' : 'está por debajo del stock mínimo'}`,
              severity: product.stock === 0 ? 'high' : 'medium',
              isRead: false,
              createdAt: new Date().toISOString()
            });
          }
        }
      });

      if (newAlerts.length > 0) {
        setAlerts(prev => {
          // Filter out alerts that are already in prev to avoid duplicates
          const filteredPrev = prev.filter(alert => !newAlerts.some(newAlert => newAlert.id === alert.id));
          return [...filteredPrev, ...newAlerts];
        });
      }
    };

    checkLowStock();
  }, [products]);

  const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Error al agregar producto');
      const data = await response.json();
      setProducts(prev => [...prev, data]);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const response = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Error al actualizar producto');
      const data = await response.json();
      setProducts(prev => prev.map(product => product.id === id ? data : product));
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar producto');
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const addMovement = (movement: Omit<MovimientoUnificado, 'id' | 'createdAt'>) => {
    const newMovement: MovimientoUnificado = {
      ...movement,
      id: Date.now().toString(),
      fecha: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    setMovements(prev => [...prev, newMovement]);
    
    // Actualizar stock si es posible (requiere productId y quantity)
    setProducts(prev => prev.map(product => {
      if (product.id === movement.productId) {
        const newStock = movement.type === 'entry' 
          ? product.stock + movement.quantity
          : product.stock - movement.quantity;
        
        return { ...product, stock: Math.max(0, newStock), updatedAt: new Date().toISOString() };
      }
      return product;
    }));
  };

  const createRequest = (request: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRequest: Request = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setRequests(prev => [...prev, newRequest]);
  };

  const updateRequest = (id: string, updates: Partial<Request>) => {
    setRequests(prev => prev.map(request => 
      request.id === id 
        ? { ...request, ...updates, updatedAt: new Date().toISOString() }
        : request
    ));
  };

  const addSupplier = (supplier: Omit<Supplier, 'id' | 'createdAt'>) => {
    const newSupplier: Supplier = {
      ...supplier,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const updateSupplier = (id: string, updates: Partial<Supplier>) => {
    setSuppliers(prev => prev.map(supplier => 
      supplier.id === id ? { ...supplier, ...updates } : supplier
    ));
  };

  const markAlertAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return products;
    
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.sku.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const generateReport = (startDate: string, endDate: string): MovimientoUnificado[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return movements.filter(movement => {
      const movementDate = new Date(movement.createdAt);
      return movementDate >= start && movementDate <= end;
    });
  };

  const exportToExcel = () => {
    // Simulate Excel export
    const csvContent = [
      ['SKU', 'Nombre', 'Categoría', 'Stock Actual', 'Stock Mínimo', 'Precio', 'Ubicación'],
      ...products.map(product => [
        product.sku,
        product.name,
        product.category,
        product.stock.toString(),
        product.minStock.toString(),
        product.price.toString(),
        product.location
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `inventario_plaza_vea_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <InventoryContext.Provider value={{
      products,
      movements,
      requests,
      suppliers,
      alerts,
      addProduct,
      updateProduct,
      deleteProduct,
      addMovement,
      createRequest,
      updateRequest,
      addSupplier,
      updateSupplier,
      markAlertAsRead,
      searchProducts,
      generateReport,
      exportToExcel
    }}>
      {children}
    </InventoryContext.Provider>
  );
};