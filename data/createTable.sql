CREATE TABLE IF NOT EXISTS "avatar" (
"id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
"avatar_name" TEXT,
"avatar_image" bytea NOT NULL
);