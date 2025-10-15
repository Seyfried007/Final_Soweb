package edu.upn.sowad.backend.repositories;

import edu.upn.sowad.backend.models.PedidoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface IPedidoRepository extends JpaRepository<PedidoModel, Integer> {
    // Consulta personalizada para obtener la lista distinta de isos
    @Query("SELECT DISTINCT iso FROM PedidoModel p JOIN p.isos iso")
    List<String> findDistinctIsos();
}
