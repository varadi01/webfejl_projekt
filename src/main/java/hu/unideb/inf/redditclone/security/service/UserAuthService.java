package hu.unideb.inf.redditclone.security.service;


import hu.unideb.inf.redditclone.entity.UserEntity;
import hu.unideb.inf.redditclone.security.model.UserAuthEntity;
import hu.unideb.inf.redditclone.security.repository.UserAuthRepository;
import hu.unideb.inf.redditclone.security.utils.UserIdUtil;
import hu.unideb.inf.redditclone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
public class UserAuthService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private UserAuthRepository repo;


    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserAuthEntity register(UserAuthEntity user) {
        UserAuthEntity eu = repo.findByUsername(user.getUsername());
        if (eu != null) {
            return null;
        }
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        userService.createUser(new UserEntity(user.getUsername(), ""));
        return user;
    }

    public String verify(UserAuthEntity user) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            String t = jwtService.generateToken(user.getUsername());
            Long uId = userService.getUserByUsername(user.getUsername()).getId();
            UserIdUtil.setRecord(t, uId);
            System.out.println("user (" + user.getUsername() + ") authenticated with jwt"+ t );
            return t;
        } else {
            System.out.println("user failed authentication");
            return null;
        }
    }
}