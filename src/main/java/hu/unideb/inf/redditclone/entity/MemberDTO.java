package hu.unideb.inf.redditclone.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "members")
public class MemberDTO {
    @Id
    @GenericGenerator(name = "member_seq_gen", strategy = "increment") //deprecated, but works for now
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "member_seq_gen")
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "community_id", referencedColumnName = "id")
    private CommunityDTO community;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserDTO user;

    public MemberDTO() {
    }

    public MemberDTO(CommunityDTO community, UserDTO user) {
        this.community = community;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public CommunityDTO getCommunity() {
        return community;
    }

    public void setCommunity(CommunityDTO community) {
        this.community = community;
    }
}
