package edu.upn.sowad.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.upn.sowad.backend.models.RegistroModel;

@Repository
public interface IRegistroRepository extends JpaRepository<RegistroModel, Integer> {
}
