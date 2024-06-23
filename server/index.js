const express = require('express');
const app =  express();
const mysql = require("mysql2");
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Crear conexión con db
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"admin",
    database:"empleados_crud"
})

// Testear conexión
// db.connect(err => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to the MySQL database.');
// });

// Método para guardar
app.post("/create", (req, res) => {
    const nombre = req.body.nombre; // Extraer campos del cuerpo de la solicitud POST
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query("INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES(?,?,?,?,?)", [nombre, edad, pais, cargo, anios],
    (err, result) => {
        if (err){
            console.log(err);
        }
        else{
            res.send("Empleado registrado con éxito"); // Si no hay errores, le envío respuesta HTTP al cliente
        }
    });
});

// Listar datos
app.get("/empleados", (req, res) => {
    const nombre = req.body.nombre; 
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query("SELECT * FROM empleados",
    (err, result) => {
        if (err){
            console.log(err);
        }
        else{
            res.send(result); 
        }
    });
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre; 
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query("UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?", [nombre, edad, pais, cargo, anios, id],
    (err, result) => {
        if (err){
            console.log(err);
        }
        else{
            res.send("Empleado registrado con éxito"); // Si no hay errores, le envío respuesta HTTP al cliente
        }
    });
});

// Cuando escuche el puerto, quiero hacer esto...
app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001")
})