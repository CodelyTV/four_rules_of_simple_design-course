CREATE TABLE post_comments (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg__post_comments__set_updated_at_to_now_before_update
    BEFORE UPDATE ON post_comments
    FOR EACH ROW
EXECUTE FUNCTION codely__set_updated_at_to_now();

CREATE OR REPLACE FUNCTION codely__set_updated_at_to_now()
	RETURNS TRIGGER
	SET search_path = ''
AS
$$
BEGIN
	new.updated_at = NOW();
	RETURN new;
END;
$$ LANGUAGE plpgsql;
