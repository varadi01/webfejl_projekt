package hu.unideb.inf.redditclone.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.GenericGenerator;

import java.util.Set;

@Entity
@Table(name = "communities")
public class CommunityDTO {

    @Id
    @GenericGenerator(name = "community_seq_gen", strategy = "increment") //deprecated, but works for now
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "community_seq_gen")
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @OneToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private UserDTO owner;

    @Column(unique = true, nullable = false)
    private String name;
    private String description;

    /*
    @Formula("(select count(community_id) from members m where m.community_id=id")
    private Long numberOfMembers; //TODO TEST

     */

    protected CommunityDTO() {
    }

    public CommunityDTO(UserDTO owner, String name, String description) {
        this.owner = owner;
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return id;
    }



    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserDTO getOwner() {
        return owner;
    }

    public void setOwner(UserDTO owner) {
        this.owner = owner;
    }

    /*
    public Long getNumberOfMembers() {
        return numberOfMembers;
    }

     */
}
