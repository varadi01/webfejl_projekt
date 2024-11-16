package hu.unideb.inf.redditclone.controller;

import com.fasterxml.jackson.databind.JsonNode;
import hu.unideb.inf.redditclone.entity.CommentEntity;
import hu.unideb.inf.redditclone.security.utils.UserIdUtil;
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
    public ResponseEntity<CommentEntity> createComment(@RequestBody CommentEntity commentEntity,
                                                       @RequestHeader(name = "Authorization") String authHeader) {

        if (!UserIdUtil.validateUserHasPermission(authHeader, commentEntity.getAuthor().getId())) {
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(commentService.createComment(commentEntity));
    }

    @PutMapping("/update")
    @CrossOrigin
    public ResponseEntity<CommentEntity> updateComment(@RequestBody JsonNode body,
                                                       @RequestHeader(name = "Authorization") String authHeader) {

        long uid =  body.get("user_id").asLong();
        long cid = body.get("comment_id").asLong();

        if (!UserIdUtil.validateUserHasPermission(authHeader, uid)) {
            return ResponseEntity.badRequest().body(null);
        }

        if (!isUserTheAuthor(uid, cid)){
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(commentService.updateCommentBody(cid,
                body.get("body").asText()));
    }

    @PutMapping("/vote")
    @CrossOrigin
    public ResponseEntity<CommentEntity> updateCommentVotes(@RequestBody JsonNode body,
                                                            @RequestHeader(name = "Authorization") String authHeader) {
        long uid =  body.get("user_id").asLong();
        long cid = body.get("comment_id").asLong();

        if (!UserIdUtil.validateUserHasPermission(authHeader, uid)) {
            return ResponseEntity.badRequest().body(null);
        }

        if (isUserTheAuthor(uid, cid)){
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(commentService.updateCommentVotes(cid,
                Integer.parseInt(body.get("vote").asText())));
    }

    private boolean isUserTheAuthor(long userId, long commentId){
        return commentService.getComment(commentId).getAuthor().getId().equals(userId);
    }

}
