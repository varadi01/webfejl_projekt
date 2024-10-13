package hu.unideb.inf.redditclone.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class PostDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String body;
    private LocalDateTime createdAt;
    private Long authorId;
    private Long communityId;
    private Long votes;
    public boolean edited = false;

    public PostDTO() {
    }

    public PostDTO(String title, String body, Long authorId, Long communityId) {
        this.title = title;
        this.body = body;
        this.authorId = authorId;
        this.communityId = communityId;
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

    public Long getAuthorId() {
        return authorId;
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

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public void setCommunityId(Long communityId) {
        this.communityId = communityId;
    }

    public void setVotes(Long votes) {
        this.votes = votes;
    }
}
