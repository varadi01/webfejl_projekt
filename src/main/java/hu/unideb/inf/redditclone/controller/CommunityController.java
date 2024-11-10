package hu.unideb.inf.redditclone.controller;

import com.fasterxml.jackson.databind.JsonNode;
import hu.unideb.inf.redditclone.entity.CommunityEntity;
import hu.unideb.inf.redditclone.security.utils.UserIdUtil;
import hu.unideb.inf.redditclone.service.CommunityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/community")
public class CommunityController {

    private final CommunityService communityService;

    public CommunityController(CommunityService communityService) {
        this.communityService = communityService;
    }

    @GetMapping("/")
    @CrossOrigin
    public ResponseEntity<List<CommunityEntity>> getAllCommunities(){
        return ResponseEntity.ok(communityService.getAllCommunities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommunityEntity> getCommunityById(@PathVariable Long id) {
        //what if null
        return ResponseEntity.ok().body(communityService.getCommunityById(id));
    }

    @PostMapping("/")
    public ResponseEntity<CommunityEntity> createCommunity(@RequestBody CommunityEntity communityEntity,
                                                           @RequestHeader(name = "Authorization") String authHeader) {
        //check for uniqueness
        List<String> existingComms = communityService.getAllCommunities().stream().map(CommunityEntity::getName).toList();
        if (existingComms.contains(communityEntity.getName())) {
            return ResponseEntity.badRequest().body(communityEntity);
        }

        if (!UserIdUtil.validateUserHasPermission(authHeader, communityEntity.getOwner().getId())) {
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(communityService.createCommunity(communityEntity));
    }

    /* //TODO TEST
    @GetMapping("/top/{limit}")
    public ResponseEntity<List<CommunityDTO>> getTopCommunities(@PathVariable int limit) {
        return ResponseEntity.ok(communityService.getTopCommunities(limit));
    }

     */

    @PutMapping("/update")
    public ResponseEntity<CommunityEntity> updateCommunityDescription(@RequestBody JsonNode body,
                                                                      @RequestHeader(name = "Authorization") String authHeader) {

        long uid = body.get("user_id").asLong();
        long cid = body.get("community_id").asLong();

        if (!UserIdUtil.validateUserHasPermission(authHeader, uid)) {
            return ResponseEntity.badRequest().body(null);
        }

        if (!isUserTheOwner(uid, cid)) {
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(communityService.updateCommunityDescription(cid,
                body.get("description").asText() ));
    }

    @DeleteMapping("/del_com")
    public ResponseEntity<String> deleteCommunity(@RequestBody JsonNode body,
                                                  @RequestHeader(name = "Authorization") String authHeader) {
        long uid = body.get("user_id").asLong();
        long cid = body.get("community_id").asLong();

        if (!UserIdUtil.validateUserHasPermission(authHeader, uid)) {
            return ResponseEntity.badRequest().body(null);
        }

        if (!isUserTheOwner(uid, cid)) {
            return ResponseEntity.badRequest().body(null);
        }

        communityService.deleteCommunityById(cid);
        return ResponseEntity.ok().body("OK");
    }

    private boolean isUserTheOwner(long userId, long communityId) {
        return communityService.getCommunityById(communityId).getOwner().getId().equals(userId);
    }
}
