import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { NegotiateController } from '../controllers/negotiate-controller';      

const router = express.Router();

router.post('/', async (req, res) => {
  const { role, city, experience, currentOffer, companySize } = req.body;

  if (!role || !city || !experience || !currentOffer || !companySize) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await NegotiateController(role, city, experience, currentOffer, companySize);
    res.json(result);
  } catch (error) {
    console.error('Error in negotiate route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;