import pool from './db/index.js';

async function testDatabase() {
  try {
    const result = await pool.query('SELECT * FROM questions');
    console.log('Questions in database:', result.rows);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

testDatabase();