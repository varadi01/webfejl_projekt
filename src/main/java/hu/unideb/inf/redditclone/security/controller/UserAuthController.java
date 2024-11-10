package hu.unideb.inf.redditclone.security.controller;

import hu.unideb.inf.redditclone.security.model.UserAuthEntity;
import hu.unideb.inf.redditclone.security.service.UserAuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;


@RestController
public class UserAuthController {

    @Autowired
    private UserAuthService service;


    @PostMapping("/register")
    public UserAuthEntity register(@RequestBody UserAuthEntity user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody UserAuthEntity user) {

        return service.verify(user);
    }
}
