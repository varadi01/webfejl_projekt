CREATE table if not exists posts(
    id integer,
    title varchar(100),
    body text,
    created_at timestamp,
    author_id integer,
    community_id integer,
    votes integer,
    edited boolean,
    PRIMARY KEY (id)
)