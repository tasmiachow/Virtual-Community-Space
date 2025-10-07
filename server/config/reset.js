import pool from './database.js';
import "./dotenv.js";
import events from './events.js';
import locations from './locations.js';

const createLocationTable = async () => {
    const createLocationTable =`
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            venue_id INTEGER UNIQUE NOT NULL,
            venue_name VARCHAR(255) NOT NULL
        );
    `;
    try {
        const res = await pool.query(createLocationTable);
        console.log("🎉 location table created successfully"); 
    }
    catch(err){
        console.log('⚠️ error creating arcs table', err);
    }
};

const seedLocationTable = async () => {
    await createLocationTable();
    for(const loc of locations){
        const insertLocation ={
            text: 'INSERT INTO locations (venue_id, venue_name) VALUES ($1, $2);',
            values: [loc.venue_id, loc.venue_name],
        };
    
        try{
            await pool.query(insertLocation);
            console.log(`✅ ${loc.venue_name} added successfully`);
        }
        catch(err){
            console.error(`⚠️ error inserting ${loc.venue_name}`, err);
        }
    }
    console.log('🌟 All locations inserted in order successfully');
}

seedLocationTable();




