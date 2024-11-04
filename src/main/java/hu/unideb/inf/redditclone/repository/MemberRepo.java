package hu.unideb.inf.redditclone.repository;

import hu.unideb.inf.redditclone.entity.CommunityDTO;
import hu.unideb.inf.redditclone.entity.MemberDTO;
import hu.unideb.inf.redditclone.entity.UserDTO;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepo extends JpaRepository<MemberDTO, Long> {
    //eh

    public List<MemberDTO> findMembersByUserId(Long userId); //BAD

    public List<MemberDTO> findMembersByCommunityId(Long communityId); //BAD

    public void deleteByCommunityIdAndUserId(Long communityId, Long userId);

    public void deleteAllByCommunityId(Long communityId);
}
