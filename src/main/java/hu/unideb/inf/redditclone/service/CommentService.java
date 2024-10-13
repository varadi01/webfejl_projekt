package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.repository.CommentRepo;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private final CommentRepo commentRepository;

    public CommentService(CommentRepo commentRepository) {
        this.commentRepository = commentRepository;
    }


    //this is where it gets iffy

    //creation only under post, and parent comment

    //deletion hard, maybe disallow

    //editing, change flag

    //getting comments under post, (under parent comment?)

    //getting comment by user

    //VOTING???
}
