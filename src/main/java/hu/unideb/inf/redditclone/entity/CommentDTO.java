package hu.unideb.inf.redditclone.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class CommentDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String text;
    private Long authorId;
    private Long postId;
    private Long parentCommentId;
    private LocalDateTime createdAt;
    private Long votes;

    public CommentDTO() {
    }

    public CommentDTO(String text, Long authorId, Long postId, Long parentCommentId) {
        this.text = text;
        this.authorId = authorId;
        this.postId = postId;
        this.parentCommentId = parentCommentId;
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public Long getPostId() {
        return postId;
    }

    public Long getParentCommentId() {
        return parentCommentId;
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

    public void setText(String text) {
        this.text = text;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public void setParentCommentId(Long parentCommentId) {
        this.parentCommentId = parentCommentId;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setVotes(Long votes) {
        this.votes = votes;
    }
}
