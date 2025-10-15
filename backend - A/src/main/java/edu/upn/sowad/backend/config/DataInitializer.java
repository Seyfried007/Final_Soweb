package edu.upn.sowad.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import edu.upn.sowad.backend.models.UsuarioModel;
import edu.upn.sowad.backend.repositories.IUsuarioRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(IUsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (usuarioRepository.findById("admin@admin.com").isEmpty()) {
                UsuarioModel admin = new UsuarioModel();
                admin.setCorreo("admin@admin.com");
                admin.setNombre("admin");
                admin.setClave(passwordEncoder.encode("admin"));
                usuarioRepository.save(admin);
                System.out.println("Usuario admin creado con contraseña 'admin'");
            }
        };
    }
}
