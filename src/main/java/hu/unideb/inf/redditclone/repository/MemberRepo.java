package hu.unideb.inf.redditclone.repository;

import hu.unideb.inf.redditclone.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepo extends JpaRepository<MemberEntity, Long> {
    //eh

    public List<MemberEntity> findMembersByUserId(Long userId); //BAD

    public List<MemberEntity> findMembersByCommunityId(Long communityId); //BAD

    public void deleteByCommunityIdAndUserId(Long communityId, Long userId);

    public void deleteAllByCommunityId(Long communityId);
}
