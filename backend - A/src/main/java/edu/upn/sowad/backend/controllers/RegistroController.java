package edu.upn.sowad.backend.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.upn.sowad.backend.models.RegistroModel;
import edu.upn.sowad.backend.models.TransaccionModel;
import edu.upn.sowad.backend.services.RegistroService;

@RestController
@RequestMapping("/registro")
public class RegistroController {

    @Autowired
    private RegistroService registroService;

    @PostMapping("/crear")
    public RegistroModel crearRegistro(@RequestBody RegistroModel registro) {
        return registroService.crearRegistro(registro);
    }

    @GetMapping(path = "/{id}")
    public java.util.Optional<RegistroModel> listarPorId(@PathVariable("id") int id){
        return this.registroService.listarPorId(id);
    }

    @GetMapping
    public java.util.ArrayList<RegistroModel> listar(){
        return (java.util.ArrayList<RegistroModel>) this.registroService.listarRegistros();
    }
}
