package hu.unideb.inf.redditclone.repository;

import hu.unideb.inf.redditclone.entity.PostDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<PostDTO, Long> {

    List<PostDTO> findAllByCommunityId(Long communityId);

    List<PostDTO> findAllByAuthorId(Long authorId);

    //top
    List<PostDTO>  findTopByOrderByVotes(); //TODO

    //List<PostDTO> findFirst50OrderByVotesDesc(); //smth

    void deleteAllByCommunityId(Long communityId);
}
