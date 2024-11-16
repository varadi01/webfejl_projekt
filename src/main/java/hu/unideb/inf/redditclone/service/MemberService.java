package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.CommunityEntity;
import hu.unideb.inf.redditclone.entity.MemberEntity;
import hu.unideb.inf.redditclone.repository.MemberRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    private final MemberRepo memberRepository;

    private final UserService userService;

    public MemberService(MemberRepo memberRepository, UserService userService) {
        this.memberRepository = memberRepository;
        this.userService = userService;
    }

    public MemberEntity joinCommunity(MemberEntity memberEntity) {
        return memberRepository.save(memberEntity);
    }

    @Transactional
    public void leaveCommunity(Long uid, Long cid) {
        memberRepository.deleteByCommunityIdAndUserId(cid, uid);
    }

    @Transactional
    public void communityDeleted(Long cid){
        //delete memberships made obsolete by deleting the community
        memberRepository.deleteAllByCommunityId(cid);
    }

    public Integer getNumberOfMembers(Long id) {
        return memberRepository.findMembersByCommunityId(id).toArray().length;
    }

    public List<MemberEntity> getAllMembers(Long id) {
         return memberRepository.findMembersByCommunityId(id);
    }

    public List<CommunityEntity> getJoinedCommunities(Long id) {
        return memberRepository.findMembersByUserId(id).stream().map(MemberEntity::getCommunity).toList();
    }

    public List<CommunityEntity> getJoinedCommunitiesByUsername(String username) {
        var u = userService.getUserByUsername(username);
        return getJoinedCommunities(u.getId());
    }
}
