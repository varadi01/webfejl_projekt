package hu.unideb.inf.redditclone.controller;

import hu.unideb.inf.redditclone.entity.CommentDTO;
import hu.unideb.inf.redditclone.service.CommentService;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<CommentDTO>> getCommentsUnderPost(@PathVariable Long postId) {
        return ResponseEntity.ok().body(commentService.getAllCommentsUnderPost(postId));
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<List<CommentDTO>>  getCommentsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok().body(commentService.getAllCommentsByAuthor(userId));
    }

    //we might need to get by parent comment

    /*
    @PostMapping("/{postId}") // do two of these and not so much logic up or what
    public CommentDTO createComment(@PathVariable Long postId, @RequestBody CommentDTO commentDTO) {
        commentService.createComment(commentDTO);
    }
    */

    //MAYBE, or do one normal one with data in json from the start (might be more logical we'll see)
    @PostMapping("/")
    public ResponseEntity<CommentDTO>  createComment(@RequestBody CommentDTO commentDTO) {
        CommentDTO comment = new CommentDTO(
                commentDTO.getText(), commentDTO.getAuthorId(),
                commentDTO.getPostId(), commentDTO.getParentCommentId());
        return ResponseEntity.ok().body(commentService.createComment(comment));
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommentDTO> updateComment(@PathVariable Long commentId, @RequestBody String body) {
        return ResponseEntity.ok().body(commentService.updateCommentBody(commentId, body));
    }

    @PutMapping("/vote/{commentId}")
    public ResponseEntity<CommentDTO> updateCommentVotes(@PathVariable Long commentId, @RequestBody String val) {
        return ResponseEntity.ok().body(commentService.updateCommentVotes(commentId, Integer.parseInt(val)));
    }

}
