var Conexion = require('../database/connection');

class Atencion {
    constructor() {
      
    }
    
    allatentions(callback) {
        var conexion = new Conexion;

        conexion.connect(function (conn) {
            conn.query("SELECT a.idAtencion, a.fechaAtencion, u.nombre AS analista, t.idTicket AS id_ticket, t.descripcion AS descripcion FROM atencion a INNER JOIN usuario u ON a.idAnalista = u.idUsuario INNER JOIN ticket t ON a.idTicket = t.idTicket", (err, rows, fields) => {
                if (!err) {
                  console.log(rows);
                  callback(rows);
                } else {
                  console.log(err);
                }
              });
        });
    }

    dateattentions(desde, hasta, callback) {
      var conexion = new Conexion;

      conexion.connect(function (conn) {
          conn.query("SELECT a.idAtencion, a.fechaAtencion, u.nombre AS analista, t.idTicket AS id_ticket, t.descripcion AS descripcion FROM atencion a INNER JOIN usuario u ON a.idAnalista = u.idUsuario INNER JOIN ticket t ON a.idTicket = t.idTicket WHERE a.fechaAtencion BETWEEN '"+desde+"' AND '"+hasta+"'", (err, rows, fields) => {
              if (!err) {
                console.log(rows);
                callback(rows);
              } else {
                console.log(err);
              }
            });
      });
  }
    
  registerattentions(user_id, ticket_id, callback) {
    var conexion = new Conexion;

    conexion.connect(function (conn) {
        conn.query("INSERT INTO atencion (idAtencion, fechaAtencion, idAnalista, idTicket) VALUES (null, CURDATE(), '"+user_id+"', '"+ticket_id+"')", (err, rows, fields) => {
            if (!err) {
              console.log(rows);
              callback(rows);
            } else {
              console.log(err);
            }
          });
    });
}
  }

  module.exports = Atencion;