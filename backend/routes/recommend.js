import express from 'express';
import { recommendMovies } from '../controllers/recommendController.js';

const router = express.Router();

router.post('/', recommendMovies);

export default router;
