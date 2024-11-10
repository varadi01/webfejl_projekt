package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.CommentEntity;
import hu.unideb.inf.redditclone.repository.CommentRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepo commentRepository;

    public CommentService(CommentRepo commentRepository) {
        this.commentRepository = commentRepository;
    }


    //this is where it gets iffy

    //creation only under post, and parent comment... UH (handled)
    public CommentEntity createComment(CommentEntity commentEntity) {
        if (commentEntity.getParentComment() == null){
            CommentEntity cmt = new CommentEntity(commentEntity.getText(), commentEntity.getAuthor(), commentEntity.getPost());
            return commentRepository.save(cmt);
        }
        CommentEntity cmt = new CommentEntity(commentEntity.getText(), commentEntity.getAuthor(), commentEntity.getPost(), commentEntity.getParentComment());
        return commentRepository.save(cmt);
    }

    //editing, change flag
    public CommentEntity getComment(Long id) {
        return commentRepository.findById(id).orElse(null);
    }

    //getting comments under post, (under parent comment?)
    public List<CommentEntity> getAllCommentsUnderPost(Long postId) {
        return commentRepository.findAllByPostId(postId);
    }

    //getting comment by user
    public List<CommentEntity> getAllCommentsByAuthor(Long authorId) {
        return commentRepository.findAllByAuthorId(authorId);
    }

    public CommentEntity updateCommentBody(Long id, String body) {
        Optional<CommentEntity> commentDTO = commentRepository.findById(id);
        if (commentDTO.isPresent()) {
            CommentEntity commentEntity1 = commentDTO.get();
            commentEntity1.setText(body);
            commentEntity1.setEdited(true);
            return commentRepository.save(commentEntity1);
        }
        return null;
    }

    public CommentEntity updateCommentVotes(Long commentId, int vote) {
        Optional<CommentEntity> optionalCommentDTO = commentRepository.findById(commentId);
        if (optionalCommentDTO.isPresent()) {
            CommentEntity commentEntity = optionalCommentDTO.get();
            commentEntity.setVotes(commentEntity.getVotes() + vote);
            return commentRepository.save(commentEntity);
        }
        return null;
    }

    @Transactional
    public void deleteCommentsUnderPost(Long postId) {
        commentRepository.deleteAllByPostId(postId);
    }
}
