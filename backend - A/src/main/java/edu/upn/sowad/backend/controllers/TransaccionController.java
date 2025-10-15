package edu.upn.sowad.backend.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.upn.sowad.backend.models.TransaccionModel;
import edu.upn.sowad.backend.services.TransaccionService;
import edu.upn.sowad.backend.services.MovimientoService;
import edu.upn.sowad.backend.dto.MovimientoDTO;

@RestController
@RequestMapping("/transaccion")
public class TransaccionController {

    @Autowired
    private TransaccionService transaccionService;

    @Autowired
    private MovimientoService movimientoService;


    @GetMapping
    public ArrayList<TransaccionModel> listar(){
        return this.transaccionService.listarTransacciones();
    }

    @GetMapping(path = "/{id:\\d+}")
    public Optional<TransaccionModel> listarPorId(@PathVariable("id") int id){
        return this.transaccionService.listarTransaccionPorId(id);
    }

    @GetMapping(path = "/codigo/{codTransaccion}")
    public Optional<TransaccionModel> listarPorCodigo(@PathVariable("codTransaccion") String codTransaccion){
        return this.transaccionService.listarTransaccionPorCodigo(codTransaccion);
    }

    @PostMapping("/crear")
    public TransaccionModel nuevaTransaccion(@RequestBody TransaccionModel obj) {
        return this.transaccionService.crearTransaccion(obj);
    }

    @PutMapping(path="/{id}")
    public TransaccionModel actualizarTransaccion(@RequestBody TransaccionModel request, @PathVariable("id") int id){
        return this.transaccionService.actualizarTransaccion(request, id);
    }

    @DeleteMapping(path="/{id}")
    public String eliminarPorId(@PathVariable("id") int id){
        boolean ok = this.transaccionService.eliminarTransaccion(id);
        if(ok){
            return "Transacción eliminada";
        }else{
            return "No se eliminó la transacción";
        }
    }

    @GetMapping("/movimientos-combinados")
    public List<MovimientoDTO> listarMovimientosCombinados() {
        return movimientoService.listarMovimientosCombinados();
    }

    // Endpoint temporal sin autenticación para pruebas
    @GetMapping("/movimientos-combinados-test")
    public List<MovimientoDTO> listarMovimientosCombinadosTest() {
        return movimientoService.listarMovimientosCombinados();
    }
}
