import pool from './database.js';
import "./dotenv.js";
import events from './events.js';
import locations from './locations.js';

const createLocationTable = async () => {
    const createLocationTable =`

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
        console.log('⚠️ error creating locations table', err);
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




const createEventTable = async () =>{
    const createEventsTable = ` 

        CREATE TABLE IF NOT EXISTS events(
            event_id SERIAL PRIMARY KEY,
            artist VARCHAR(255) NOT NULL, 
            date DATE NOT NULL, 
            time TIMETZ NOT NULL,
            timezone TEXT NOT NULL, 
            image_url TEXT NOT NULL, 
            venue_id INTEGER NOT NULL,
            FOREIGN KEY (venue_id) REFERENCES locations(venue_id)
        );
        `;
        try {
        const res = await pool.query(createEventsTable);
        console.log("🎉 events table created successfully"); 
        }
        catch(err){
            console.log('⚠️ error creating events table', err);
        }
};



const seedEventsTable = async () =>{
    await createEventTable();
    for(const event of events){
        const insertEvent ={
            text: 'INSERT INTO events (artist, date, time, timezone, image_url, venue_id) VALUES ($1, $2, $3, $4, $5, $6);', 
            values: [event.artist, event.date, event.time, event.timezone, event.image_url, event.venue_id]
        };
        try { 
            await pool.query(insertEvent);
            console.log(`✅ ${event.artist} added successfully`);
        }
        catch (err){
            console.error(`⚠️ error inserting ${event.artist}`, err);
        }
    }
    console.log('🌟 All events inserted in order successfully');
}

const dropTables = async() =>{
    const dropTables =  `
        DROP TABLE IF EXISTS events;  
        DROP TABLE IF EXISTS locations;
    ` 
    try{
        const res = await pool.query(dropTables);
        console.log("🎉 tables successfully dropped"); 
    }
    catch (err){
        console.log("error droppeing tables", err); 
    }
}
await dropTables();
await seedLocationTable(); 
await seedEventsTable();
