import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import EventController from '../controllers/event.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();

router.get('/events', EventController.getEvents);


router.get('/events/venue/:venue_id', EventController.getEventByVenue);

router.get('/locations', EventController.getAllLocations);

export default router;