package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.PostEntity;
import hu.unideb.inf.redditclone.repository.PostRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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
    public List<PostEntity> getNewPosts() {
        var lastWeek = LocalDateTime.now().minusWeeks(1);
        return postRepository.findAllByCreatedAtAfterOrderByCreatedAt(lastWeek);
    }

    public List<PostEntity> getHotPosts(){
        var lastWeek = LocalDateTime.now().minusWeeks(1);
        return postRepository.findAllByCreatedAtAfterOrderByVotes(lastWeek);
    }

    //get posts by community, get a few at a time

    public List<PostEntity> getAllPostsByCommunity(Long communityId) {
        return postRepository.findAllByCommunityId(communityId);
    }

    //create post
    public PostEntity createPost(PostEntity postEntity) {
        return postRepository.save(postEntity);
    }

    //get post by author

    public List<PostEntity> getAllPostsByUserId(Long userId) {
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

    public PostEntity updatePostBody(Long postId, String body) {
        Optional<PostEntity> optionalPostDTO = postRepository.findById(postId);
        if (optionalPostDTO.isPresent()) {
            PostEntity postEntity = optionalPostDTO.get();
            postEntity.setBody(body);
            postEntity.setEdited(true);
            return postRepository.save(postEntity);
        }
        return null;
    }

    //voting

    public PostEntity updatePostVotes(Long postId, int vote) {
        Optional<PostEntity> optionalPostDTO = postRepository.findById(postId);
        if (optionalPostDTO.isPresent()) {
            PostEntity postEntity = optionalPostDTO.get();
            postEntity.setVotes(postEntity.getVotes() + vote);
            return postRepository.save(postEntity);
        }
        return null;
    }
}
