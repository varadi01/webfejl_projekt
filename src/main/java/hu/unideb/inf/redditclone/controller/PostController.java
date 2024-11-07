package hu.unideb.inf.redditclone.controller;

import hu.unideb.inf.redditclone.entity.PostEntity;
import hu.unideb.inf.redditclone.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/hot")
    public ResponseEntity<List<PostEntity>> getHotPosts() {
        return ResponseEntity.ok(postService.getHotPosts());
    }

    @GetMapping("/new")
    public ResponseEntity<List<PostEntity>> getNewPosts() {
        return ResponseEntity.ok(postService.getNewPosts());
    }

    @GetMapping("/{communityId}")
    public ResponseEntity<List<PostEntity>> getPostsByCommunityId(@PathVariable Long communityId) {
        return ResponseEntity.ok().body(postService.getAllPostsByCommunity(communityId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostEntity>> getPostsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok().body(postService.getAllPostsByUserId(userId));
    }

    //this stupid or nah?
    @PostMapping("/")
    public ResponseEntity<PostEntity> createPost(@RequestBody PostEntity postEntity) {
        PostEntity post = new PostEntity(postEntity.getTitle(), postEntity.getBody(), postEntity.getAuthor() , postEntity.getCommunity());
        return ResponseEntity.ok().body(postService.createPost(post));
    }

    //needs auth
    @PutMapping("/{postId}") // requestbody gets parsed to a raw string
    public ResponseEntity<PostEntity> updatePost(@PathVariable Long postId, @RequestBody String body) {
        return ResponseEntity.ok().body(postService.updatePostBody(postId, body));
    }

    //string with val: 1 or -1
    @PutMapping("/vote/{postId}")
    public ResponseEntity<PostEntity> updatePostVotes(@PathVariable Long postId, @RequestBody String val) {
        return ResponseEntity.ok().body(postService.updatePostVotes(postId, Integer.parseInt(val)));
    }

    @DeleteMapping("/del/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.ok().body("ok");
    }
}
