package hu.unideb.inf.redditclone.controller;

import hu.unideb.inf.redditclone.entity.CommunityEntity;
import hu.unideb.inf.redditclone.entity.MemberEntity;
import hu.unideb.inf.redditclone.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    //weird
    @GetMapping("/com/{communityId}")
    public ResponseEntity<Integer> getNumberOfMembers(@PathVariable Long communityId) {
        return ResponseEntity.ok().body(memberService.getNumberOfMembers(communityId));
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<List<CommunityEntity>> getJoinedCommunities(@PathVariable Long userId) {
        return ResponseEntity.ok().body(memberService.getJoinedCommunities(userId));
    }

    @PostMapping("join/")
    public ResponseEntity<MemberEntity> joinCommunity(@RequestBody MemberEntity memberEntity) {
        return ResponseEntity.ok().body(memberService.joinCommunity(memberEntity));
    }

    @DeleteMapping("leave/")
    public ResponseEntity<String> leaveCommunity(@RequestBody MemberEntity memberEntity) {
        memberService.leaveCommunity(memberEntity.getUser().getId(), memberEntity.getCommunity().getId());
        return ResponseEntity.ok().body("");
    }

    @DeleteMapping("delcom")
    public ResponseEntity<String> deleteCommunity(@RequestBody Long communityId ) {
        memberService.communityDeleted(communityId);
        return ResponseEntity.ok().body("ok");
    }
}
