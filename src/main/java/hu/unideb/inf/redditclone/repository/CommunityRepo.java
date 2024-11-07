package hu.unideb.inf.redditclone.repository;

import hu.unideb.inf.redditclone.entity.CommunityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityRepo extends JpaRepository<CommunityEntity, Long> {

    List<CommunityEntity> findAllByOwnerId(Long ownerId);

    //List<CommunityDTO> findByOrderByNumberOfMembers(Limit limit); //TODO TEST may have to be TopX

    //List<CommunityDTO> findAllByOrderByNumberOfMembers(Limit limit);
}
