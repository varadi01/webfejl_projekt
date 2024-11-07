package hu.unideb.inf.redditclone.controller;

import hu.unideb.inf.redditclone.entity.CommunityEntity;
import hu.unideb.inf.redditclone.service.CommunityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/community")
public class ComunityController {

    private final CommunityService communityService;

    public ComunityController(CommunityService communityService) {
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
    public ResponseEntity<CommunityEntity> createCommunity(@RequestBody CommunityEntity communityEntity) {
        //TODO
        //check for uniquness
        return ResponseEntity.ok().body(communityService.createCommunity(communityEntity));
    }

    /* //TODO TEST
    @GetMapping("/top/{limit}")
    public ResponseEntity<List<CommunityDTO>> getTopCommunities(@PathVariable int limit) {
        return ResponseEntity.ok(communityService.getTopCommunities(limit));
    }

     */

    // i like this url passing stuff but this cant be secure..
    //why not just have the json contain this stuff
    @PutMapping("/{id}")
    public ResponseEntity<CommunityEntity> updateCommunityDescription(@PathVariable Long id, @RequestBody String description) {
        return ResponseEntity.ok().body(communityService.updateCommunityDescription(id, description));
    }

    @DeleteMapping("/delcom")
    public ResponseEntity<String> deleteCommunity(@RequestBody Long id) {
        communityService.deleteCommunityById(id);
        return ResponseEntity.ok().body("OK");
    }
}
