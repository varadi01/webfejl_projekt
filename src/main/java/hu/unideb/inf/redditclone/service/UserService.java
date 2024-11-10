package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.UserEntity;
import hu.unideb.inf.redditclone.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    //manages business logic

    //ide jo az autowired
    private final UserRepo userRepository;

    public UserService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity createUser(UserEntity user) {
        user.setDisplayName(user.getUsername());
        return userRepository.save(user);
    }

    public UserEntity getUserByUsername(String username) {
        Optional<UserEntity> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return user.get();
        }
        return null;
    }

    public UserEntity getUserById(Long id) {
        Optional<UserEntity> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        }
        return null;
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public UserEntity updateUserDisplayName(Long userId, String newDisplayName){
        Optional<UserEntity> user = userRepository.findById(userId);
        if (user.isPresent()) {
            UserEntity userEntity = user.get();
            userEntity.setDisplayName(newDisplayName);
            return userRepository.save(userEntity);
        }
        return null;
    }

    public UserEntity updateUserBio(Long userId, String newBio){
        Optional<UserEntity> user = userRepository.findById(userId);
        if (user.isPresent()) {
            UserEntity userEntity = user.get();
            userEntity.setBio(newBio);
            return userRepository.save(userEntity);
        }
        return null;
    }
}
