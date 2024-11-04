package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.CommunityDTO;
import hu.unideb.inf.redditclone.entity.MemberDTO;
import hu.unideb.inf.redditclone.repository.MemberRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepo memberRepository;

    public MemberService(MemberRepo memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberDTO joinCommunity(MemberDTO memberDTO) {
        return memberRepository.save(memberDTO);
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

    public List<MemberDTO> getAllMembers(Long id) {
         return memberRepository.findMembersByCommunityId(id);
    }

    public List<CommunityDTO> getJoinedCommunities(Long id) {
        return memberRepository.findMembersByUserId(id).stream().map(MemberDTO::getCommunity).toList();
    }
}
