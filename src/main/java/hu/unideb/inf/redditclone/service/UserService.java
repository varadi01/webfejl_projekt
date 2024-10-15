package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.UserDTO;
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

    public UserDTO createUser(UserDTO user) {
        return userRepository.save(user);
    }

    public UserDTO getUserByUsername(String username) {
        Optional<UserDTO> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return user.get();
        }
        return null;
    }

    public UserDTO getUserById(Long id) {
        Optional<UserDTO> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        }
        return null;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll();
    }

    public UserDTO updateUserDisplayName(Long userId, String newDisplayName){
        Optional<UserDTO> user = userRepository.findById(userId);
        if (user.isPresent()) {
            UserDTO userDTO = user.get();
            userDTO.setDisplayName(newDisplayName);
            return userRepository.save(userDTO);
        }
        return null;
    }
}
