package hu.unideb.inf.redditclone.repository;

import hu.unideb.inf.redditclone.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<PostEntity, Long> {

    List<PostEntity> findAllByCommunityId(Long communityId);

    List<PostEntity> findAllByAuthorId(Long authorId);

    //top
    List<PostEntity>  findTopByOrderByVotes(); //TODO

    List<PostEntity> findAllByCreatedAtAfterOrderByCreatedAt(LocalDateTime date);

    List<PostEntity> findAllByCreatedAtAfterOrderByVotes(LocalDateTime date);

    //List<PostDTO> findFirst50OrderByVotesDesc(); //smth

    void deleteAllByCommunityId(Long communityId);
}
