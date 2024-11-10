package hu.unideb.inf.redditclone.controller;

import com.fasterxml.jackson.databind.JsonNode;
import hu.unideb.inf.redditclone.entity.PostEntity;
import hu.unideb.inf.redditclone.security.utils.UserIdUtil;
import hu.unideb.inf.redditclone.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/post")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/hot")
    public ResponseEntity<List<PostEntity>> getHotPosts() {
        return ResponseEntity.ok().body(postService.getHotPosts());
    }

    //TODO not ordered?, TEST
    @GetMapping("/new")
    public ResponseEntity<List<PostEntity>> getNewPosts() {
        return ResponseEntity.ok().body(postService.getNewPosts());
    }

    @GetMapping("/{communityId}")
    public ResponseEntity<List<PostEntity>> getPostsByCommunityId(@PathVariable Long communityId) {
        return ResponseEntity.ok().body(postService.getAllPostsByCommunity(communityId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostEntity>> getPostsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok().body(postService.getAllPostsByUserId(userId));
    }

    @PostMapping("/")
    public ResponseEntity<PostEntity> createPost(@RequestBody PostEntity postEntity,
                                                 @RequestHeader(name = "Authorization") String authHeader) {

        if (postEntity.getCommunity().getId() == null){
            return ResponseEntity.badRequest().body(null);
        }

        if (!UserIdUtil.validateUserHasPermission(authHeader, postEntity.getAuthor().getId())) {
            return ResponseEntity.badRequest().body(null);
        }

        PostEntity post = new PostEntity(postEntity.getTitle(), postEntity.getBody(),
                postEntity.getAuthor(), postEntity.getCommunity());
        return ResponseEntity.ok().body(postService.createPost(post));
    }

    @PutMapping("/update")
    public ResponseEntity<PostEntity> updatePost(@RequestBody JsonNode body,
                                                 @RequestHeader(name = "Authorization") String authHeader) {
        long uid = body.get("user_id").asLong();
        long pid = body.get("post_id").asLong();

        if (!UserIdUtil.validateUserHasPermission(authHeader, uid)) {
            return ResponseEntity.badRequest().body(null);
        }

        if (!isUserTheAuthor(uid,pid)){
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(postService.updatePostBody(pid,
                body.get("body").asText()));
    }

    //string with val: 1 or -1
    @PutMapping("/vote")
    public ResponseEntity<PostEntity> updatePostVotes(@RequestBody JsonNode body,
                                                      @RequestHeader(name = "Authorization") String authHeader) {
        long uid = body.get("user_id").asLong();
        long pid = body.get("post_id").asLong();

        if (!UserIdUtil.validateUserHasPermission(authHeader, uid)) {
            return ResponseEntity.badRequest().body(null);
        }

        if (isUserTheAuthor(uid,pid)){
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(postService.updatePostVotes(pid,
                Integer.parseInt(body.get("vote").asText())));
    }

    @DeleteMapping("/del")
    public ResponseEntity<String> deletePost(@RequestHeader(name = "Authorization") String authHeader,
                                             @RequestBody JsonNode body) {
        long uid = body.get("user_id").asLong();
        long pid = body.get("post_id").asLong();

        //body has post_id and user_id
        if (!UserIdUtil.validateUserHasPermission(authHeader, uid)) {
            return ResponseEntity.badRequest().body(null);
        }

        if (!isUserTheAuthor(uid,pid)){
            return ResponseEntity.badRequest().body(null);
        }

        postService.deletePost(pid);
        return ResponseEntity.ok().body("ok");
    }

    private boolean isUserTheAuthor(long userId, long postId){
        return  postService.getPostById(postId).getAuthor().getId().equals(userId);
    }
}
