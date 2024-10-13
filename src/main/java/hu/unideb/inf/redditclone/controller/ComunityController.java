package hu.unideb.inf.redditclone.controller;

import hu.unideb.inf.redditclone.entity.CommunityDTO;
import hu.unideb.inf.redditclone.entity.UserDTO;
import hu.unideb.inf.redditclone.service.CommunityService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/community/cont")
public class ComunityController {

    private final CommunityService communityService;

    public ComunityController(CommunityService communityService) {
        this.communityService = communityService;
    }

    @GetMapping("/")
    public ResponseEntity<List<CommunityDTO>> getAllCommunities(){
        return ResponseEntity.ok(communityService.getAllCommunities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommunityDTO> getCommunityById(@PathVariable Long id) {
        //what if null
        return ResponseEntity.ok().body(communityService.getCommunityById(id));
    }

    @PostMapping("/")
    public ResponseEntity<CommunityDTO> createCommunity(@RequestBody CommunityDTO communityDTO) {
        //TODO
        //check for uniquness
        return ResponseEntity.ok().body(communityService.createCommunity(communityDTO));
    }
}
