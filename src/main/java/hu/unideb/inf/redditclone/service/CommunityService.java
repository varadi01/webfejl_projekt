package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.CommunityEntity;
import hu.unideb.inf.redditclone.entity.MemberEntity;
import hu.unideb.inf.redditclone.repository.CommunityRepo;
import jakarta.transaction.Transactional;
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

    public CommunityEntity createCommunity(CommunityEntity communityEntity) {
        CommunityEntity c = communityRepository.save(communityEntity);
        memberService.joinCommunity(new MemberEntity(communityEntity, communityEntity.getOwner()));
        return c;
    }

    public List<CommunityEntity> getAllCommunities() {
        return communityRepository.findAll();
    }

    //getting top comms etc
    /*
    public List<CommunityDTO> getTopCommunities(int limit) {
        return communityRepository.findByOrderByNumberOfMembers(new Limit(0, limit)); //TODO TEST
    }

     */

    public CommunityEntity getCommunityById(Long id) {
        Optional<CommunityEntity> comm = communityRepository.findById(id);
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
    public CommunityEntity updateCommunityDescription(Long id, String description) {
        Optional<CommunityEntity> comm = communityRepository.findById(id);
        if (comm.isPresent()) {
            CommunityEntity communityEntity = comm.get();
            communityEntity.setDescription(description);
            return communityRepository.save(communityEntity);
        }
        return null;
    }
}
