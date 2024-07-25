import { PythonShell } from 'python-shell';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelPath = path.join(__dirname, '../../model-training/model.pkl');

export const recommendMovies = (req, res) => {
  const { user_id } = req.body;

  // Use Python script to get recommendations
  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: __dirname,
    args: [user_id]
  };

  PythonShell.run('recommend.py', options, (err, results) => {
    if (err) throw err;
    const recommendations = JSON.parse(results[0]);
    res.json({ recommendations });
  });
};
