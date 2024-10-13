package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.PostDTO;
import hu.unideb.inf.redditclone.repository.PostRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepo postRepository;

    public PostService(PostRepo postRepository) {
        this.postRepository = postRepository;
    }

    //get top posts recently?

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
