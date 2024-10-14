package hu.unideb.inf.redditclone.repository;

import hu.unideb.inf.redditclone.entity.MemberDTO;
import hu.unideb.inf.redditclone.entity.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepo extends JpaRepository<MemberDTO, Long> {
    //eh

    public List<MemberDTO> findMembersByUserId(Long userId);

    public List<MemberDTO> findMembersByCommunityId(Long communityId);
}
