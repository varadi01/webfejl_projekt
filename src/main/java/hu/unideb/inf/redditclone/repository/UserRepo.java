package hu.unideb.inf.redditclone.repository;

import hu.unideb.inf.redditclone.entity.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserDTO, Long> {

    Optional<UserDTO> findByUsername(String username);
}
