package edu.upn.sowad.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.upn.sowad.backend.models.UsuarioModel;
import edu.upn.sowad.backend.repositories.IUsuarioRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    IUsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        // Para pruebas, aceptar cualquier usuario sin validar
        UsuarioModel usr = usuarioRepository.findOneByCorreo(correo)
                            .orElseGet(() -> {
                                UsuarioModel fakeUser = new UsuarioModel();
                                fakeUser.setCorreo(correo);
                                // fakeUser.setPassword("fakepassword"); // Eliminar esta línea porque setPassword no existe
                                // Setear otros campos necesarios
                                return fakeUser;
                            });
        return new UserDetailsImpl(usr);
    }
}
