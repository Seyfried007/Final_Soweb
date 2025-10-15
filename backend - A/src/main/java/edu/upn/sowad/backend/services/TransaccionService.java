package edu.upn.sowad.backend.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.upn.sowad.backend.models.TransaccionModel;
import edu.upn.sowad.backend.models.PedidoModel;
import edu.upn.sowad.backend.models.PedidoIsosModel;
import edu.upn.sowad.backend.repositories.ITransaccionRepository;
import edu.upn.sowad.backend.repositories.IPedidoIsosRepository;
import edu.upn.sowad.backend.services.PedidoService;

@Service
public class TransaccionService {

    @Autowired
    ITransaccionRepository transaccionRepository;

    @Autowired
    PedidoService pedidoService;

    @Autowired
    IPedidoIsosRepository pedidoIsosRepository;

    public ArrayList<TransaccionModel> listarTransacciones(){
        return (ArrayList<TransaccionModel>) transaccionRepository.findAll();
    }

    public Optional<TransaccionModel> listarTransaccionPorId(int id){
        return transaccionRepository.findById(id);
    }

    public Optional<TransaccionModel> listarTransaccionPorCodigo(String codTransaccion){
        return transaccionRepository.findByCodTransaccion(codTransaccion);
    }

    public TransaccionModel crearTransaccion(TransaccionModel obj){
        TransaccionModel transaccionGuardada = transaccionRepository.save(obj);

        // Crear un pedido asociado con el código de transacción
        PedidoModel pedido = new PedidoModel();
        pedido.setCodTransaccion(transaccionGuardada.getCodTransaccion());
        pedidoService.crearPedido(pedido);

        // Guardar isos en pedido_isos
        if (obj.getProductoIsos() != null) {
            for (String iso : obj.getProductoIsos()) {
                PedidoIsosModel pedidoIso = new PedidoIsosModel();
                pedidoIso.setPedidoId(Long.valueOf(pedido.getId()));
                pedidoIso.setIso(iso);
                pedidoIsosRepository.save(pedidoIso);
            }
        }

        return transaccionGuardada;
    }

    public TransaccionModel actualizarTransaccion(TransaccionModel obj, int id){
        TransaccionModel e = transaccionRepository.findById(id).get();
        e.setCodTransaccion(obj.getCodTransaccion());
        e.setNombrePropietario(obj.getNombrePropietario());
        e.setMontoFinal(obj.getMontoFinal());
        transaccionRepository.save(e);
        return e;
    }

    public Boolean eliminarTransaccion(int id){
        transaccionRepository.deleteById(id);
        return true;
    }
}
