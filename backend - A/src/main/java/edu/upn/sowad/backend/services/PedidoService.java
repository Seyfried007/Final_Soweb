package edu.upn.sowad.backend.services;

import edu.upn.sowad.backend.models.PedidoModel;
import edu.upn.sowad.backend.repositories.IPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private IPedidoRepository pedidoRepository;

    public PedidoModel crearPedido(PedidoModel pedido) {
        try {
            return pedidoRepository.save(pedido);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public List<PedidoModel> listarPedidos() {
        return pedidoRepository.findAll();
    }

    // Nuevo método para obtener lista distinta de isos
    public List<String> obtenerIsosDistintos() {
        return pedidoRepository.findDistinctIsos();
    }
}
