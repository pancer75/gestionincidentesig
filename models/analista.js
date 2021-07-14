var Conexion = require('../database/connection');

class Analista {
    constructor() {
      
    }
    
    analysts(callback) {
        var conexion = new Conexion;

        conexion.connect(function (conn) {
            conn.query("SELECT u.nombre AS analista, g.nombre FROM usuario u INNER JOIN grupo g ON u.idGrupo = g.idGrupo WHERE u.idTipo = 2", (err, rows, fields) => {
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
    
  }

  module.exports = Analista;