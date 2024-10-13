package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.CommentDTO;
import hu.unideb.inf.redditclone.entity.PostDTO;
import hu.unideb.inf.redditclone.repository.CommentRepo;
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

    public CommentDTO updateCommentBody(Long id, String body) {
        Optional<CommentDTO> commentDTO = commentRepository.findById(id);
        if (commentDTO.isPresent()) {
            CommentDTO commentDTO1 = commentDTO.get();
            commentDTO1.setText(body);
            return commentRepository.save(commentDTO1);
        }
        return null;
    }

    //VOTING???
    //should work
    public CommentDTO updateCommentVotes(Long commentId, int vote) {
        Optional<CommentDTO> optionalCommentDTO = commentRepository.findById(commentId);
        if (optionalCommentDTO.isPresent()) {
            CommentDTO commentDTO = optionalCommentDTO.get();
            commentDTO.setVotes(commentDTO.getVotes() + vote);
            return commentRepository.save(commentDTO);
        }
        return null;
    }
}
