DROP TABLE IF EXISTS posts CASCADE;
CREATE TABLE suggestions ( 
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  sex TEXT NOT NULL
);