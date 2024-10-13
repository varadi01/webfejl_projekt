package hu.unideb.inf.redditclone.service;

import hu.unideb.inf.redditclone.entity.CommunityDTO;
import hu.unideb.inf.redditclone.repository.CommunityRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommunityService {

    private final CommunityRepo communityRepository;

    public CommunityService(CommunityRepo communityRepository) {
        this.communityRepository = communityRepository;
    }

    public CommunityDTO createCommunity(CommunityDTO communityDTO) {
        return communityRepository.save(communityDTO);
    }

    public List<CommunityDTO> getAllCommunities() {
        return communityRepository.findAll();
    }

    public CommunityDTO getCommunityById(Long id) {
        Optional<CommunityDTO> comm = communityRepository.findById(id);
        if (comm.isPresent()) {
            return comm.get();
        }
        return null;
    }

    //getting joined comms by user

    //getting top comms etc
}
