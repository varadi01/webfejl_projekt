package hu.unideb.inf.redditclone.controller;

import com.fasterxml.jackson.databind.JsonNode;
import hu.unideb.inf.redditclone.entity.CommunityEntity;
import hu.unideb.inf.redditclone.entity.MemberEntity;
import hu.unideb.inf.redditclone.security.utils.UserIdUtil;
import hu.unideb.inf.redditclone.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member")
@CrossOrigin
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/com/{communityId}")
    @CrossOrigin
    public ResponseEntity<Integer> getNumberOfMembers(@PathVariable Long communityId) {
        return ResponseEntity.ok().body(memberService.getNumberOfMembers(communityId));
    }

    @GetMapping("/user/{userId}")
    @CrossOrigin
    public ResponseEntity<List<CommunityEntity>> getJoinedCommunities(@PathVariable Long userId) {
        return ResponseEntity.ok().body(memberService.getJoinedCommunities(userId));
    }

    @CrossOrigin
    @GetMapping("user/name/{username}")
    public ResponseEntity<List<CommunityEntity>> getJoinedCommunitiesByUsername(@PathVariable String username) {
        return ResponseEntity.ok().body(memberService.getJoinedCommunitiesByUsername(username));
    }

    @PostMapping("/join")
    @CrossOrigin
    public ResponseEntity<MemberEntity> joinCommunity(@RequestBody MemberEntity memberEntity,
                                                      @RequestHeader(name = "Authorization") String authHeader) {

        if (!UserIdUtil.validateUserHasPermission(authHeader, memberEntity.getUser().getId())) {
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(memberService.joinCommunity(memberEntity));
    }

    @DeleteMapping("/leave")
    @CrossOrigin
    public ResponseEntity<String> leaveCommunity(@RequestBody MemberEntity memberEntity,
                                                 @RequestHeader(name = "Authorization") String authHeader) {

        if (!UserIdUtil.validateUserHasPermission(authHeader, memberEntity.getUser().getId())) {
            return ResponseEntity.badRequest().body(null);
        }

        memberService.leaveCommunity(memberEntity.getUser().getId(), memberEntity.getCommunity().getId());
        return ResponseEntity.ok().body("");
    }
}
