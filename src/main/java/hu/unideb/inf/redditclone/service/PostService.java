package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.PostDTO;
import hu.unideb.inf.redditclone.repository.PostRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepo postRepository;
    private final CommentService commentService;

    public PostService(PostRepo postRepository, CommentService commentService) {
        this.postRepository = postRepository;
        this.commentService = commentService;
    }

    //get top posts recently?
    //TODO
    public List<PostDTO> getNewPosts() {
        var lastWeek = LocalDateTime.now().minusWeeks(1);
        return postRepository.findAllByCreatedAtAfterOrderByCreatedAt(lastWeek);
    }

    public List<PostDTO> getHotPosts(){
        var lastWeek = LocalDateTime.now().minusWeeks(1);
        return postRepository.findAllByCreatedAtAfterOrderByVotes(lastWeek);
    }

    //get posts by community, get a few at a time

    public List<PostDTO> getAllPostsByCommunity(Long communityId) {
        return postRepository.findAllByCommunityId(communityId);
    }

    //create post
    public PostDTO createPost(PostDTO postDTO) {
        return postRepository.save(postDTO);
    }

    //get post by author

    public List<PostDTO> getAllPostsByUserId(Long userId) {
        return postRepository.findAllByAuthorId(userId);
    }

    //delete post
    @Transactional //might not need
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
        commentService.deleteCommentsUnderPost(postId);
    }

    @Transactional
    public void deletePostsInCommunity(Long communityId) {
        postRepository.deleteAllByCommunityId(communityId);
    }

    public PostDTO updatePostBody(Long postId, String body) {
        Optional<PostDTO> optionalPostDTO = postRepository.findById(postId);
        if (optionalPostDTO.isPresent()) {
            PostDTO postDTO = optionalPostDTO.get();
            postDTO.setBody(body);
            postDTO.setEdited(true);
            return postRepository.save(postDTO);
        }
        return null;
    }

    //voting

    public PostDTO updatePostVotes(Long postId, int vote) {
        Optional<PostDTO> optionalPostDTO = postRepository.findById(postId);
        if (optionalPostDTO.isPresent()) {
            PostDTO postDTO = optionalPostDTO.get();
            postDTO.setVotes(postDTO.getVotes() + vote);
            return postRepository.save(postDTO);
        }
        return null;
    }
}
