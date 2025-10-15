package edu.upn.sowad.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios")
public class UsuarioModel {

    @Id
    private String correo;

    private String nombre;

    private String clave;

    public UsuarioModel() {
    }

    public UsuarioModel(String correo, String nombre, String clave) {
        this.correo = correo;
        this.nombre = nombre;
        this.clave = clave;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }
}
