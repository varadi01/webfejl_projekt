package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.CommentDTO;
import hu.unideb.inf.redditclone.repository.CommentRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepo commentRepository;

    public CommentService(CommentRepo commentRepository) {
        this.commentRepository = commentRepository;
    }


    //this is where it gets iffy

    //creation only under post, and parent comment... UH (handled)
    public CommentDTO createComment(CommentDTO commentDTO) {
        return commentRepository.save(commentDTO);
    }

    //editing, change flag


    //getting comments under post, (under parent comment?)
    public List<CommentDTO> getAllCommentsUnderPost(Long postId) {
        return commentRepository.findAllByPostId(postId);
    }

    //getting comment by user
    public List<CommentDTO> getAllCommentsByAuthor(Long authorId) {
        return commentRepository.findAllByAuthorId(authorId);
    }

    //VOTING???
}
