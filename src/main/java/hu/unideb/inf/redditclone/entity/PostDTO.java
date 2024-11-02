package hu.unideb.inf.redditclone.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
public class PostDTO {

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
    private UserDTO author;
    @Column(nullable = false)
    private Long communityId;
    private Long votes;
    private boolean edited = false;

    public PostDTO() {
    }

    public PostDTO(String title, String body, UserDTO author, Long communityId) {
        this.title = title;
        this.body = body;
        this.author = author;
        this.communityId = communityId;
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

    public Long getCommunityId() {
        return communityId;
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

    public void setCommunityId(Long communityId) {
        this.communityId = communityId;
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

    public UserDTO getAuthor() {
        return author;
    }

    public void setAuthor(UserDTO author) {
        this.author = author;
    }
}
