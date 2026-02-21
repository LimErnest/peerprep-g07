-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    question_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    constraints TEXT,
    test_cases JSONB NOT NULL DEFAULT '[]',
    leetcode_link VARCHAR(500),
    difficulty VARCHAR(10) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    topics TEXT[] NOT NULL DEFAULT '{}',
    image_urls TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Auto-update updated_at on row update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_questions_updated_at
    BEFORE UPDATE ON questions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed with 2 sample questions
INSERT INTO questions (title, description, constraints, test_cases, leetcode_link, difficulty, topics)
VALUES
(
    'Reverse a String',
    'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
    E'1 <= s.length <= 10^5\ns[i] is a printable ascii character.',
    '[
        {"input": "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]", "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]"},
        {"input": "s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]", "output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]"}
    ]',
    'https://leetcode.com/problems/reverse-string/',
    'Easy',
    ARRAY['Strings', 'Algorithms']
),
(
    'Linked List Cycle Detection',
    'Implement a function to detect if a linked list contains a cycle.',
    E'The number of the nodes in the list is in the range [0, 10^4].\n-10^5 <= Node.val <= 10^5\npos is -1 or a valid index in the linked-list.',
    '[
        {"input": "head = [3,2,0,-4], pos = 1", "output": "true"},
        {"input": "head = [1,2], pos = 0", "output": "true"},
        {"input": "head = [1], pos = -1", "output": "false"}
    ]',
    'https://leetcode.com/problems/linked-list-cycle/',
    'Easy',
    ARRAY['Data Structures', 'Algorithms']
);