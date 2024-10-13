package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.PostDTO;
import hu.unideb.inf.redditclone.repository.PostRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

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


}
