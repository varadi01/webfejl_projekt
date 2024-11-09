CREATE TABLE if not exists users(
    id integer,
    username varchar(50),
    email varchar(100),
    display_name varchar(50),
    bio text,
    PRIMARY KEY (id)
)
