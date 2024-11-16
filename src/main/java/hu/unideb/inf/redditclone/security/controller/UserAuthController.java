package hu.unideb.inf.redditclone.security.controller;

import com.fasterxml.jackson.databind.JsonNode;
import hu.unideb.inf.redditclone.security.model.UserAuthEntity;
import hu.unideb.inf.redditclone.security.service.UserAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;


@RestController
public class UserAuthController {

    @Autowired
    private UserAuthService service;

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<UserAuthEntity> register(@RequestBody UserAuthEntity user) {
        UserAuthEntity u = service.register(user);
        if (u == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok().body(u);
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserAuthEntity user) {
        //service.verify(user)
        String t = service.verify(user);
        if (t != null){
            return ResponseEntity.ok(t +";" +user.getUsername());
        }
        return ResponseEntity.badRequest().body(null);
    }
}
