package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.MemberDTO;
import hu.unideb.inf.redditclone.repository.MemberRepo;
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

    public void leaveCommunity(Long id) {
        //TODO
    }


    public List<MemberDTO> getAllMembers(Long id) {
         return memberRepository.findMembersByCommunityId(id);
    }

    public List<MemberDTO> getJoinedCommunities(Long id) {
        return memberRepository.findMembersByUserId(id);
    }
}
