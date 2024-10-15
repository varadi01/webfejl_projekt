create table if not exists comments(
    id integer,
    text text,
    author_id integer,
    post_id integer,
    parent_comment_id integer,
    created_at timestamp,
    votes integer,
    edited boolean,
    primary key (id)
)