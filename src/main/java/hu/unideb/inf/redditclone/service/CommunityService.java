package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.CommunityDTO;
import hu.unideb.inf.redditclone.entity.MemberDTO;
import hu.unideb.inf.redditclone.entity.PostDTO;
import hu.unideb.inf.redditclone.repository.CommunityRepo;
import jakarta.transaction.Transactional;
import org.hibernate.query.spi.Limit;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommunityService {

    private final CommunityRepo communityRepository;
    private final MemberService memberService;
    private final PostService postService;

    public CommunityService(CommunityRepo communityRepository, MemberService memberService, PostService postService) {
        this.communityRepository = communityRepository;
        this.memberService = memberService;
        this.postService = postService;
    }

    public CommunityDTO createCommunity(CommunityDTO communityDTO) {
        return communityRepository.save(communityDTO);
    }

    public List<CommunityDTO> getAllCommunities() {
        return communityRepository.findAll();
    }

    //getting top comms etc
    /*
    public List<CommunityDTO> getTopCommunities(int limit) {
        return communityRepository.findByOrderByNumberOfMembers(new Limit(0, limit)); //TODO TEST
    }

     */

    public CommunityDTO getCommunityById(Long id) {
        Optional<CommunityDTO> comm = communityRepository.findById(id);
        if (comm.isPresent()) {
            return comm.get();
        }
        return null;
    }


    @Transactional
    public void deleteCommunityById(Long id) {
        communityRepository.deleteById(id);
        memberService.communityDeleted(id);
        postService.deletePostsInCommunity(id);
    }


    //updating subs
    //only owner can do these
    public CommunityDTO updateCommunityDescription(Long id, String description) {
        Optional<CommunityDTO> comm = communityRepository.findById(id);
        if (comm.isPresent()) {
            CommunityDTO communityDTO = comm.get();
            communityDTO.setDescription(description);
            return communityRepository.save(communityDTO);
        }
        return null;
    }
}
