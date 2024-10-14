package hu.unideb.inf.redditclone.entity;

import jakarta.persistence.*;
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

    private Long ownerId;
    @Column(unique = true, nullable = false)
    private String name;
    private String description;
    //private Long numberOfMembers; //eh

    //manyToMany with user (joined)

    protected CommunityDTO() {
    }

    public CommunityDTO(Long ownerId, String name, String description) {
        this.ownerId = ownerId;
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public Long getOwnerId() {
        return ownerId;
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

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
