package edu.upn.sowad.backend.dto;

import java.util.List;

public class MovimientoDTO {
    private String productoNombre;
    private String productoSKU;
    private List<String> productoIsos;
    private String estado;
    private String codigoVenta;
    private double costo;
    private String fecha;
    private String persona;

    public MovimientoDTO() {}

    public MovimientoDTO(String productoNombre, String productoSKU, List<String> productoIsos, String estado, String codigoVenta, double costo, String fecha, String persona) {
        this.productoNombre = productoNombre;
        this.productoSKU = productoSKU;
        this.productoIsos = productoIsos;
        this.estado = estado;
        this.codigoVenta = codigoVenta;
        this.costo = costo;
        this.fecha = fecha;
        this.persona = persona;
    }

    public String getProductoNombre() {
        return productoNombre;
    }

    public void setProductoNombre(String productoNombre) {
        this.productoNombre = productoNombre;
    }

    public String getProductoSKU() {
        return productoSKU;
    }

    public void setProductoSKU(String productoSKU) {
        this.productoSKU = productoSKU;
    }

    public List<String> getProductoIsos() {
        return productoIsos;
    }

    public void setProductoIsos(List<String> productoIsos) {
        this.productoIsos = productoIsos;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCodigoVenta() {
        return codigoVenta;
    }

    public void setCodigoVenta(String codigoVenta) {
        this.codigoVenta = codigoVenta;
    }

    public double getCosto() {
        return costo;
    }

    public void setCosto(double costo) {
        this.costo = costo;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getPersona() {
        return persona;
    }

    public void setPersona(String persona) {
        this.persona = persona;
    }
}
