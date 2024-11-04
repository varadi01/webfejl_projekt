package hu.unideb.inf.redditclone.repository;

import hu.unideb.inf.redditclone.entity.CommunityDTO;
import org.hibernate.query.spi.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommunityRepo extends JpaRepository<CommunityDTO, Long> {

    List<CommunityDTO> findAllByOwnerId(Long ownerId);

    //List<CommunityDTO> findByOrderByNumberOfMembers(Limit limit); //TODO TEST may have to be TopX

    //List<CommunityDTO> findAllByOrderByNumberOfMembers(Limit limit);
}
