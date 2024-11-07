package hu.unideb.inf.redditclone.controller;

import hu.unideb.inf.redditclone.entity.CommentEntity;
import hu.unideb.inf.redditclone.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<CommentEntity>> getCommentsUnderPost(@PathVariable Long postId) {
        return ResponseEntity.ok().body(commentService.getAllCommentsUnderPost(postId));
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<List<CommentEntity>>  getCommentsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok().body(commentService.getAllCommentsByAuthor(userId));
    }

    @PostMapping("/")
    public ResponseEntity<CommentEntity> createComment(@RequestBody CommentEntity commentEntity) {
        return ResponseEntity.ok().body(commentService.createComment(commentEntity));
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommentEntity> updateComment(@PathVariable Long commentId, @RequestBody String body) {
        return ResponseEntity.ok().body(commentService.updateCommentBody(commentId, body));
    }

    @PutMapping("/vote/{commentId}")
    public ResponseEntity<CommentEntity> updateCommentVotes(@PathVariable Long commentId, @RequestBody String val) {
        return ResponseEntity.ok().body(commentService.updateCommentVotes(commentId, Integer.parseInt(val)));
    }

}
