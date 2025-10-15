package edu.upn.sowad.backend.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "pedido")
public class PedidoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "cod_transaccion", nullable = false)
    private String codTransaccion;

    @ElementCollection
    @CollectionTable(name = "pedido_isos", joinColumns = @JoinColumn(name = "pedido_id"))
    @Column(name = "iso")
    private List<String> isos;

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

    public List<String> getIsos() {
        return isos;
    }

    public void setIsos(List<String> isos) {
        this.isos = isos;
    }
}
