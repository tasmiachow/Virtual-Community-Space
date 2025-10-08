import pool from "../config/database.js";

const getEvents = async(req, res) =>{
    try{
        const results = await pool.query(`SELECT * FROM events ORDER BY date ASC;`);
        res.status(200).json(results.rows);
    }
    catch(error){
        res.status(409).json({error: error.message});
    }
}

const getEventByVenue = async(req, res) => {
    const { venue_id } = req.params; 
    try {
        const result = await pool.query(`SELECT * FROM events WHERE venue_id= $1`, [venue_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(result.rows);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

const getAllLocations = async(req, res) => {
    try{
        const results = await pool.query(`SELECT * FROM locations ORDER BY venue_id ASC;`);
        res.status(200).json(results.rows);
    }
     catch(error){
        res.status(409).json({error: error.message});
    }
}

export default {
    getEvents,
    getEventByVenue, 
    getAllLocations
}
