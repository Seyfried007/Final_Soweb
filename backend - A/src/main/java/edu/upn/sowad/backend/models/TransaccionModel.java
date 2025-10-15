package edu.upn.sowad.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

import java.util.List;

@Entity
@Table(name = "transaccion")
public class TransaccionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)   
    private int id;

    @Column
    private String codTransaccion;

    @Column
    private String nombrePropietario;

    @Column
    private double montoFinal;

    // Nuevo campo para lista de isos
    @Transient
    private List<String> productoIsos;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCodTransaccion() {
        return codTransaccion;
    }

    public void setCodTransaccion(String codTransaccion) {
        this.codTransaccion = codTransaccion;
    }

    public String getNombrePropietario() {
        return nombrePropietario;
    }

    public void setNombrePropietario(String nombrePropietario) {
        this.nombrePropietario = nombrePropietario;
    }

    public double getMontoFinal() {
        return montoFinal;
    }

    public void setMontoFinal(double montoFinal) {
        this.montoFinal = montoFinal;
    }

    public List<String> getProductoIsos() {
        return productoIsos;
    }

    public void setProductoIsos(List<String> productoIsos) {
        this.productoIsos = productoIsos;
    }
}
