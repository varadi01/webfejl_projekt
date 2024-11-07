package hu.unideb.inf.redditclone.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class CommentEntity {

    @Id
    @GenericGenerator(name = "comment_seq_gen", strategy = "increment") //deprecated, but works for now
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "comment_seq_gen")
    @Column(name = "id", unique = true, nullable = false)
    private Long id;
    private String text;
    @ManyToOne
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    private UserEntity author;
    @OneToOne
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private PostEntity post;
    //might wanna revert this to id simply
    @OneToOne
    @JoinColumn(name = "parent_comment_id",referencedColumnName = "id")
    private CommentEntity parentComment;
    private LocalDateTime createdAt;
    private Long votes;
    @Column(nullable = false)
    private boolean edited = false;

    //might need one without parent
    public CommentEntity(String text, UserEntity author, PostEntity post, CommentEntity parentComment) {
        this.text = text;
        this.author = author;
        this.post = post;
        this.parentComment = parentComment;
        this.createdAt = LocalDateTime.now();
        this.votes = 1L;
    }

    public CommentEntity(String text, UserEntity author, PostEntity post) {
        this.text = text;
        this.author = author;
        this.post = post;
        this.parentComment = null;
        this.createdAt = LocalDateTime.now();
        this.votes = 1L;
    }

    public CommentEntity() {}


    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
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

    public CommentEntity getParentComment() {
        return parentComment;
    }

    public void setParentComment(CommentEntity parentComment) {
        this.parentComment = parentComment;
    }

    public PostEntity getPost() {
        return post;
    }

    public void setPost(PostEntity post) {
        this.post = post;
    }

    public UserEntity getAuthor() {
        return author;
    }

    public void setAuthor(UserEntity author) {
        this.author = author;
    }
}
