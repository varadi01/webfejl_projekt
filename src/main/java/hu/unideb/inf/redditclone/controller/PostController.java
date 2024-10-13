package hu.unideb.inf.redditclone.controller;

import hu.unideb.inf.redditclone.entity.CommentDTO;
import hu.unideb.inf.redditclone.entity.PostDTO;
import hu.unideb.inf.redditclone.service.PostService;
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
    public List<PostDTO> getPostsByCommunityId(@PathVariable Long communityId) {
        return postService.getAllPostsByCommunity(communityId);
    }

    @GetMapping("/user/{userId}")
    public List<PostDTO> getPostsByUserId(@PathVariable Long userId) {
        return postService.getAllPostsByUserId(userId);
    }

    @PostMapping("/{communityId}")
    public PostDTO createPost(@PathVariable Long communityId, @RequestBody PostDTO postDTO) {
        //same thing here, either do this or fumble with json
        PostDTO post = postDTO;
        post.setCommunityId(communityId);
        return postService.createPost(post);
    }

    @PutMapping("/{postId}")
    public PostDTO updatePost(@PathVariable Long postId, @RequestBody PostDTO postDTO) {
        //TODO
        return null;
    }

    @PutMapping("/{postId}/{val}")
    public PostDTO updatePostVotes(@PathVariable Long postId, @PathVariable Integer val) {
        //TODO
        return null;
    }

}
