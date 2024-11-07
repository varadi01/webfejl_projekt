package hu.unideb.inf.redditclone.repository;

import hu.unideb.inf.redditclone.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<CommentEntity, Long> {

    List<CommentEntity> findAllByPostId(Long postId);

    List<CommentEntity> findAllByAuthorId(Long authorId);

    void deleteAllByPostId(Long postId);
}
