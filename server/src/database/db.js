const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('khatawahi.db',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('connnected to database')
    }
})

try {
    db.run(`CREATE TABLE IF NOT EXISTS Transections (
        id INTEGER PRIMARY KEY,
        date DATE NOT NULL,
        type TEXT NOT NULL,
        amount FLOAT NOT NULL,
        bank TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        verified BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES User(user_id)
      )`,(err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Table created successfully');
        }
    })

    db.run(`CREATE TABLE IF NOT EXISTS User (
      user_id INTEGER PRIMARY KEY,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )`,(err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table created successfully');
      }
    })
    
} catch (error) { 
    console.log(error);
}
;

module.exports = db;