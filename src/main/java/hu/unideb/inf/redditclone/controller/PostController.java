package hu.unideb.inf.redditclone.controller;

import hu.unideb.inf.redditclone.entity.CommentDTO;
import hu.unideb.inf.redditclone.entity.PostDTO;
import hu.unideb.inf.redditclone.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post/cont")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{communityId}")
    public ResponseEntity<List<PostDTO>> getPostsByCommunityId(@PathVariable Long communityId) {
        return ResponseEntity.ok().body(postService.getAllPostsByCommunity(communityId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostDTO>> getPostsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok().body(postService.getAllPostsByUserId(userId));
    }


    //this stupid or nah?
    @PostMapping("/{communityId}")
    public ResponseEntity<PostDTO> createPost(@PathVariable Long communityId, @RequestBody PostDTO postDTO) {
        //same thing here, either do this or fumble with json
        PostDTO post = postDTO;
        post.setCommunityId(communityId);
        return ResponseEntity.ok().body(postService.createPost(post));
    }

    @PutMapping("/{postId}")
    public ResponseEntity<PostDTO> updatePost(@PathVariable Long postId, @RequestBody String body) {
        return ResponseEntity.ok().body(postService.updatePostBody(postId, body));
    }

    //json with val: 1 or -1
    @PutMapping("/vote/{postId}")
    public ResponseEntity<PostDTO> updatePostVotes(@PathVariable Long postId, @RequestBody Integer val) {
        return ResponseEntity.ok().body(postService.updatePostVotes(postId, val));
    }

}
