package hu.unideb.inf.redditclone.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "members")
public class MemberDTO {
    //I'd rather not use joins so i handle community members with this

    @Id
    @GenericGenerator(name = "member_seq_gen", strategy = "increment") //deprecated, but works for now
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "member_seq_gen")
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    private Long communityId;
    private Long userId;

    public MemberDTO() {
    }

    public MemberDTO(Long communityId, Long userId) {
        this.communityId = communityId;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCommunityId() {
        return communityId;
    }

    public void setCommunityId(Long communityId) {
        this.communityId = communityId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
