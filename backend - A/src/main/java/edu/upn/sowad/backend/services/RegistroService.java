package edu.upn.sowad.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.upn.sowad.backend.models.RegistroModel;
import edu.upn.sowad.backend.repositories.IRegistroRepository;

@Service
public class RegistroService {

    @Autowired
    private IRegistroRepository registroRepository;

    public RegistroModel crearRegistro(RegistroModel registro) {
        return registroRepository.save(registro);
    }

    public List<RegistroModel> listarRegistros() {
        return registroRepository.findAll();
    }

    public java.util.Optional<RegistroModel> listarPorId(int id) {
        return registroRepository.findById(id);
    }
}
