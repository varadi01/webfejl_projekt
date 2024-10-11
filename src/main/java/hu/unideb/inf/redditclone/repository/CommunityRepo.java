package hu.unideb.inf.redditclone.repository;

import hu.unideb.inf.redditclone.entity.CommunityDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityRepo extends JpaRepository<CommunityDTO, Long> {

    List<CommunityDTO> findAllByOwnerId(Long ownerId);

    //List<CommunityDTO> findAllByUserId(Long userId); //something like this
}
