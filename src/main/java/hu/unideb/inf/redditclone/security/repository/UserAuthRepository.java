package hu.unideb.inf.redditclone.security.repository;


import hu.unideb.inf.redditclone.security.model.UserAuthEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAuthRepository extends JpaRepository<UserAuthEntity, Integer> {

    UserAuthEntity findByUsername(String username);
}
