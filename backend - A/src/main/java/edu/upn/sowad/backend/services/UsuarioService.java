package edu.upn.sowad.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.upn.sowad.backend.models.UsuarioModel;
import edu.upn.sowad.backend.repositories.IUsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private IUsuarioRepository usuarioRepository;

    public List<UsuarioModel> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<UsuarioModel> getUsuarioByCorreo(String correo) {
        return usuarioRepository.findById(correo);
    }

    public UsuarioModel saveUsuario(UsuarioModel usuario) {
        return usuarioRepository.save(usuario);
    }

    public void deleteUsuario(String correo) {
        usuarioRepository.deleteById(correo);
    }
}
