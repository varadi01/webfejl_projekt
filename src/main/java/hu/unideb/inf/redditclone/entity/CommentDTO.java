package hu.unideb.inf.redditclone.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class CommentDTO {

    @Id
    @GenericGenerator(name = "comment_seq_gen", strategy = "increment") //deprecated, but works for now
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "comment_seq_gen")
    @Column(name = "id", unique = true, nullable = false)
    private Long id;
    private String text;
    @Column(nullable = false)
    private Long authorId;
    @Column(nullable = false)
    private Long postId;
    @Column(nullable = true)
    private Long parentCommentId;
    private LocalDateTime createdAt;
    private Long votes;
    @Column(nullable = false)
    private boolean edited = false;

    public CommentDTO() {
    }

    public CommentDTO(String text, Long authorId, Long postId, Long parentCommentId) {
        this.text = text;
        this.authorId = authorId;
        this.postId = postId;
        this.parentCommentId = parentCommentId;
        this.createdAt = LocalDateTime.now();
        this.votes = 1L;
    }

    //do i need this?
    public CommentDTO(String text, Long authorId, Long postId) {
        this.text = text;
        this.authorId = authorId;
        this.postId = postId;
        this.parentCommentId = null;
        this.createdAt = LocalDateTime.now();
        this.votes = 1L;
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

    public boolean isEdited() {
        return edited;
    }

    public void setEdited(boolean edited) {
        this.edited = edited;
    }
}
