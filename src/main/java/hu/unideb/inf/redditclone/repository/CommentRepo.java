package hu.unideb.inf.redditclone.repository;

import hu.unideb.inf.redditclone.entity.CommentDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<CommentDTO, Long> {

    List<CommentDTO> findAllByPostId(Long postId);

    List<CommentDTO> findAllByAuthorId(Long authorId);

    void deleteAllByPostId(Long postId);
}
