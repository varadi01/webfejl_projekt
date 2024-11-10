package hu.unideb.inf.redditclone.controller;

import com.fasterxml.jackson.databind.JsonNode;
import hu.unideb.inf.redditclone.entity.UserEntity;
import hu.unideb.inf.redditclone.security.utils.UserIdUtil;
import hu.unideb.inf.redditclone.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    @CrossOrigin
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long id) {
        //what if null
        return ResponseEntity.ok().body(userService.getUserById(id));
    }

    @PutMapping("/namech")
    public ResponseEntity<UserEntity> updateUserDisplayName(@RequestBody JsonNode body,
                                                            @RequestHeader(name = "Authorization") String authHeader) {
        if (!UserIdUtil.validateUserHasPermission(authHeader, body.get("user_id").asLong())){
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(userService.updateUserDisplayName(body.get("user_id").asLong(),
                body.get("display_name").asText()));
    }

    @PutMapping("/bio")
    public ResponseEntity<UserEntity> updateUserBio(@RequestBody JsonNode body,
                                                    @RequestHeader(name = "Authorization") String authHeader){

        if (!UserIdUtil.validateUserHasPermission(authHeader, body.get("user_id").asLong())){
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(userService.updateUserBio(body.get("user_id").asLong(),
                body.get("bio").asText()));
    }
}
