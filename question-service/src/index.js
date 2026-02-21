import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pool from './db/index.js';
// import questionRoutes from './routes/questions.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Health check ─────────────────────────────────────────────
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    return res.status(200).json({ status: 'ok', service: 'question-service', db: 'connected' });
  } catch (err) {
    return res.status(503).json({ status: 'error', service: 'question-service', db: 'disconnected' });
  }
});

app.listen(PORT, () => {
  console.log(`Question service listening on port ${PORT}`);
});