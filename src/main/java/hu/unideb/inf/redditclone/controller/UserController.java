package hu.unideb.inf.redditclone.controller;

import hu.unideb.inf.redditclone.entity.UserDTO;
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
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        //what if null
        return ResponseEntity.ok().body(userService.getUserById(id));
    }

    @PostMapping("/")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        //TODO
        //check for uniquness
        return ResponseEntity.ok().body(userService.createUser(userDTO));
    }

    //PROBABLY
    @PutMapping("/namech/{userId}")
    public ResponseEntity<UserDTO> updateUserDisplayName(@PathVariable Long userId, @RequestBody String displayName) {
        return ResponseEntity.ok().body(userService.updateUserDisplayName(userId, displayName));
    }
}
