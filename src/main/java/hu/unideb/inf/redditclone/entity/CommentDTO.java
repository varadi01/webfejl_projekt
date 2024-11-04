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
    @ManyToOne
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    private UserDTO author;
    @OneToOne
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private PostDTO post;
    @OneToOne
    @JoinColumn(name = "parent_comment_id",referencedColumnName = "id")
    private CommentDTO parentComment;
    private LocalDateTime createdAt;
    private Long votes;
    @Column(nullable = false)
    private boolean edited = false;

    //might need one without parent
    public CommentDTO(String text, UserDTO author, PostDTO post, CommentDTO parentComment) {
        this.text = text;
        this.author = author;
        this.post = post;
        this.parentComment = parentComment;
        this.createdAt = LocalDateTime.now();
        this.votes = 1L;
    }

    public CommentDTO(String text, UserDTO author, PostDTO post) {
        this.text = text;
        this.author = author;
        this.post = post;
        this.parentComment = null;
        this.createdAt = LocalDateTime.now();
        this.votes = 1L;
    }

    public CommentDTO() {}


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

    public CommentDTO getParentComment() {
        return parentComment;
    }

    public void setParentComment(CommentDTO parentComment) {
        this.parentComment = parentComment;
    }

    public PostDTO getPost() {
        return post;
    }

    public void setPost(PostDTO post) {
        this.post = post;
    }

    public UserDTO getAuthor() {
        return author;
    }

    public void setAuthor(UserDTO author) {
        this.author = author;
    }
}
