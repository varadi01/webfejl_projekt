package hu.unideb.inf.redditclone.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
public class PostEntity {

    @Id
    @GenericGenerator(name = "post_seq_gen", strategy = "increment") //deprecated, but works for now
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "post_seq_gen")
    @Column(name = "id", unique = true, nullable = false)
    private Long id;
    @Column(nullable = false)
    private String title;
    private String body; //this might have to be a raw?
    private LocalDateTime createdAt;
    @ManyToOne
    @JoinColumn(name = "author_id", referencedColumnName = "id") //may need to be camelcase
    private UserEntity author;
    @OneToOne
    @JoinColumn(name = "community_id", referencedColumnName = "id")
    private CommunityEntity community;
    private Long votes;
    private boolean edited = false;

    public PostEntity() {
    }

    public PostEntity(String title, String body, UserEntity author, CommunityEntity community) {
        this.title = title;
        this.body = body;
        this.author = author;
        this.community = community;
        this.createdAt = LocalDateTime.now();
        this.votes = 1L;
    }


    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }



    public Long getVotes() {
        return votes;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


    public void setVotes(Long votes) {
        this.votes = votes;
    }

    public boolean isEdited() {
        return edited;
    }

    public void setEdited(boolean edited) {
        this.edited = edited;
    }

    public UserEntity getAuthor() {
        return author;
    }

    public void setAuthor(UserEntity author) {
        this.author = author;
    }

    public CommunityEntity getCommunity() {
        return community;
    }

    public void setCommunity(CommunityEntity community) {
        this.community = community;
    }
}
