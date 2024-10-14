package hu.unideb.inf.redditclone.controller;

import hu.unideb.inf.redditclone.entity.MemberDTO;
import hu.unideb.inf.redditclone.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member/cont")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    //kifejezetten a memberek lehet nem kellenek, csak a szamuk
    @GetMapping("/com/{communityId}")
    public ResponseEntity<List<Long>> getMembers(@PathVariable Long communityId) {
        //IDKET AD VISSZA, LEHET JOBB HA OBJEKTMOT
        List<MemberDTO> members = memberService.getAllMembers(communityId);
        return ResponseEntity.ok().body(
                members.stream().map(MemberDTO::getUserId).toList()
        );
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<List<Long>> getJoinedCommunities(@PathVariable Long userId) {
        List<MemberDTO> members = memberService.getJoinedCommunities(userId);
        return ResponseEntity.ok().body(
                members.stream().map(MemberDTO::getCommunityId).toList()
        );
    }

    @PostMapping("/")
    public ResponseEntity<MemberDTO> createMember(@RequestBody MemberDTO memberDTO) {
        return ResponseEntity.ok().body(memberService.joinCommunity(memberDTO));
    }
}
