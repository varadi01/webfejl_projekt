create table if not exists communities(
    id integer,
    owner_id integer,
    name varchar(100),
    description text,
    primary key (id)
)