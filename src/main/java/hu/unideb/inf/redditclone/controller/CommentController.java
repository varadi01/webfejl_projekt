package hu.unideb.inf.redditclone.controller;

import hu.unideb.inf.redditclone.entity.CommentDTO;
import hu.unideb.inf.redditclone.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment/cont")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{postId}")
    public List<CommentDTO> getCommentsUnderPost(@PathVariable Long postId) {
        return commentService.getAllCommentsUnderPost(postId);
    }

    @GetMapping("user/{userId}")
    public List<CommentDTO> getCommentsByUser(@PathVariable Long userId) {
        return commentService.getAllCommentsByAuthor(userId);
    }

    //we might need to get by parent comment

    /*
    @PostMapping("/{postId}") // do two of these and not so much logic up or what
    public CommentDTO createComment(@PathVariable Long postId, @RequestBody CommentDTO commentDTO) {
        commentService.createComment(commentDTO);
    }
    */

    @PutMapping("/{commentId}")
    public CommentDTO updateComment(@PathVariable Long commentId, @RequestBody CommentDTO commentDTO) {
        //TODO
        return null;
    }

    @PutMapping("/{commentId}/{val}")
    public CommentDTO updateCommentVotes(@PathVariable Long commentId, @PathVariable Integer val) {
        //TODO
        return null;
    }

    //MAYBE, or do one normal one with data in json from the start (might be more logical we'll see)
    @PostMapping("/{postId}")
    public CommentDTO createComment(@PathVariable Long postId, @RequestBody CommentDTO commentDTO) {
        CommentDTO comment = commentDTO;
        comment.setPostId(postId);
        return commentService.createComment(comment);
    }

    @PostMapping("/{postId}/{parentId}")
    public CommentDTO createCommentWithParent(@PathVariable Long postId, @PathVariable Long parentId, @RequestBody CommentDTO commentDTO) {
        CommentDTO comment = commentDTO;
        comment.setPostId(postId);
        comment.setParentCommentId(parentId);
        return commentService.createComment(comment);
    }

}
