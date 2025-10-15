package edu.upn.sowad.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.upn.sowad.backend.models.UsuarioModel;
import edu.upn.sowad.backend.repositories.IUsuarioRepository;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private IUsuarioRepository usuarioRepository;

    @GetMapping("/all")
    public List<UsuarioModel> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{correo}")
    public ResponseEntity<UsuarioModel> getUsuarioByCorreo(@PathVariable String correo) {
        return usuarioRepository.findById(correo)
                .map(usuario -> ResponseEntity.ok().body(usuario))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/crear")
    public UsuarioModel createUsuario(@RequestBody UsuarioModel usuario) {
        return usuarioRepository.save(usuario);
    }

    @PutMapping("/actualizar/{correo}")
    public ResponseEntity<UsuarioModel> updateUsuario(@PathVariable String correo, @RequestBody UsuarioModel usuarioDetails) {
        return usuarioRepository.findById(correo)
                .map(usuario -> {
                    usuario.setNombre(usuarioDetails.getNombre());
                    usuario.setClave(usuarioDetails.getClave());
                    return ResponseEntity.ok().body(usuarioRepository.save(usuario));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/eliminar/{correo}")
    public ResponseEntity<?> deleteUsuario(@PathVariable String correo) {
        return usuarioRepository.findById(correo)
                .map(usuario -> {
                    usuarioRepository.delete(usuario);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
