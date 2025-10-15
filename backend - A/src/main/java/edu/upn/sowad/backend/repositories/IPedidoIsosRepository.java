package edu.upn.sowad.backend.repositories;

import edu.upn.sowad.backend.models.PedidoIsosModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPedidoIsosRepository extends JpaRepository<PedidoIsosModel, Long> {
    List<PedidoIsosModel> findByPedidoId(Long pedidoId);
}
