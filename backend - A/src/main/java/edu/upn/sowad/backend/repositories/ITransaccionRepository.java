package edu.upn.sowad.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.upn.sowad.backend.models.TransaccionModel;

@Repository
public interface ITransaccionRepository extends JpaRepository<TransaccionModel, Integer> {
    Optional<TransaccionModel> findByCodTransaccion(String codTransaccion);

    // Cambiar a lista para evitar error NonUniqueResultException
    java.util.List<TransaccionModel> findAllByCodTransaccion(String codTransaccion);
}
