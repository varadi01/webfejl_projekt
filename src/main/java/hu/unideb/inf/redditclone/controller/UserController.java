package hu.unideb.inf.redditclone.controller;

import hu.unideb.inf.redditclone.entity.UserEntity;
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

    @PostMapping("/") //TODO REMOVE
    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity userEntity) {
        return ResponseEntity.ok().body(userService.createUser(userEntity));
    }

    //PROBABLY
    @PutMapping("/namech/{userId}")
    public ResponseEntity<UserEntity> updateUserDisplayName(@PathVariable Long userId, @RequestBody String displayName) {
        return ResponseEntity.ok().body(userService.updateUserDisplayName(userId, displayName));
    }
}
