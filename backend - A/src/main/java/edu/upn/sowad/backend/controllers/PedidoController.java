package edu.upn.sowad.backend.controllers;

import edu.upn.sowad.backend.models.PedidoModel;
import edu.upn.sowad.backend.services.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedido")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/crear")
    public ResponseEntity<PedidoModel> crearPedido(@RequestBody PedidoModel pedido) {
        PedidoModel nuevoPedido = pedidoService.crearPedido(pedido);
        return ResponseEntity.ok(nuevoPedido);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<PedidoModel>> listarPedidos() {
        List<PedidoModel> pedidos = pedidoService.listarPedidos();
        return ResponseEntity.ok(pedidos);
    }

    // Nuevo endpoint para obtener lista de isos
    @GetMapping("/isos")
    public ResponseEntity<List<String>> obtenerIsos() {
        List<String> isos = pedidoService.obtenerIsosDistintos();
        return ResponseEntity.ok(isos);
    }

    // Nuevo endpoint para crear pedido_isos (lista de isos para un pedido)
    @PostMapping("/isos/crear")
    public ResponseEntity<Void> crearPedidoIsos(@RequestBody PedidoModel pedido) {
        try {
            // Guardar o actualizar el pedido con sus isos
            pedidoService.crearPedido(pedido);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
