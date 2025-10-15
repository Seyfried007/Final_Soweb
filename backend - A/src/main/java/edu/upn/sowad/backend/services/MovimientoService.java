package edu.upn.sowad.backend.services;

import edu.upn.sowad.backend.dto.MovimientoDTO;
import edu.upn.sowad.backend.models.PedidoModel;
import edu.upn.sowad.backend.models.PedidoIsosModel;
import edu.upn.sowad.backend.models.TransaccionModel;
import edu.upn.sowad.backend.repositories.IPedidoIsosRepository;
import edu.upn.sowad.backend.repositories.IPedidoRepository;
import edu.upn.sowad.backend.repositories.ITransaccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovimientoService {

    @Autowired
    private IPedidoRepository pedidoRepository;

    @Autowired
    private ITransaccionRepository transaccionRepository;

    @Autowired
    private IPedidoIsosRepository pedidoIsosRepository;

    public List<MovimientoDTO> listarMovimientosCombinados() {
        List<MovimientoDTO> movimientos = new ArrayList<>();

        List<PedidoModel> pedidos = pedidoRepository.findAll();

        for (PedidoModel pedido : pedidos) {
            String codTransaccion = pedido.getCodTransaccion();
            java.util.List<TransaccionModel> transacciones = transaccionRepository.findAllByCodTransaccion(codTransaccion);

            for (TransaccionModel transaccion : transacciones) {

                MovimientoDTO dto = new MovimientoDTO();
                dto.setCodigoVenta(codTransaccion);
                dto.setCosto(transaccion.getMontoFinal());
                dto.setPersona(transaccion.getNombrePropietario());
                dto.setEstado("Iniciando"); // Asumiendo estado inicial, puede ajustarse según lógica
                dto.setFecha(""); // Se puede agregar fecha si está disponible en alguna tabla

                // Obtener isos relacionados al pedido
                // Usar la lista de isos directamente desde PedidoModel
                List<String> isos = pedido.getIsos();

                // Si se requiere obtener desde repositorio, se puede comentar la línea anterior y usar esta:
                // List<PedidoIsosModel> pedidoIsos = pedidoIsosRepository.findByPedidoId(Long.valueOf(pedido.getId()));
                // List<String> isos = pedidoIsos.stream().map(PedidoIsosModel::getIso).collect(Collectors.toList());

                dto.setProductoIsos(isos);

                // Obtener nombre y SKU reales del producto asociado al pedido
                // Aquí se debe implementar la lógica para obtener el nombre y SKU reales
                // Por ejemplo, consultar un repositorio de productos o servicio externo
                // Por ahora, se asigna un nombre de producto basado en el primer iso para demostración
                if (!isos.isEmpty()) {
                    String primerIso = isos.get(0);
                    // Ejemplo: asignar nombre y SKU basado en iso
                    switch (primerIso) {
                        case "1":
                            dto.setProductoNombre("D122 FSSC 22000");
                            dto.setProductoSKU("001");
                            break;
                        case "2":
                            dto.setProductoNombre("D123 Kit (V2.0)");
                            dto.setProductoSKU("002");
                            break;
                        case "3":
                            dto.setProductoNombre("D124 Kit ISO 20121");
                            dto.setProductoSKU("003");
                            break;
                        case "4":
                            dto.setProductoNombre("D125 Documentos NABH");
                            dto.setProductoSKU("004");
                            break;
                        case "5":
                            dto.setProductoNombre("D126 ISO 13485:2016");
                            dto.setProductoSKU("005");
                            break;
                        case "6":
                            dto.setProductoNombre("D127 SA 8000:2014");
                            dto.setProductoSKU("006");
                            break;
                        case "7":
                            dto.setProductoNombre("D128 Kit ISO 17024, procedimientos, lista de verificación");
                            dto.setProductoSKU("007");
                            break;
                        case "8":
                            dto.setProductoNombre("D129 Kit ISO 20000");
                            dto.setProductoSKU("008");
                            break;
                        case "9":
                            dto.setProductoNombre("D130 Kit ISO/IEC 17043:2023");
                            dto.setProductoSKU("009");
                            break;
                        case "10":
                            dto.setProductoNombre("D131 BRC Storage");
                            dto.setProductoSKU("010");
                            break;
                        default:
                            dto.setProductoNombre("Producto desconocido");
                            dto.setProductoSKU("");
                    }
                } else {
                    dto.setProductoNombre("Producto desconocido");
                    dto.setProductoSKU("");
                }

                movimientos.add(dto);
            }
        }

        return movimientos;
    }
}
