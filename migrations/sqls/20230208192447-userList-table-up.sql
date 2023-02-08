CREATE TABLE user_list (
    id SERIAL,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    PRIMARY KEY (user_id,movie_id),
    CONSTRAINT user_fk
        FOREIGN KEY (user_id)
            REFERENCES users(id),
    CONSTRAINT movie_fk
        FOREIGN KEY (movie_id)
            REFERENCES movies(id)
);