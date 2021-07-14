var Conexion = require('../database/connection');

class Ticket {
    constructor() {
      
    }
    
    alltickets(callback) {
        var conexion = new Conexion;

        conexion.connect(function (conn) {
            conn.query("SELECT t.idTicket, t.descripcion, t.fechaIngreso, e.nombre AS estado, p.nombre AS prioridad, tc.nombre AS tipocaso, CONCAT(u.nombre,' ',U.apellido) as usuario, em.nombre AS empresa FROM ticket t INNER JOIN usuario u ON t.idUsuario = u.idUsuario INNER JOIN tipo_caso tc ON t.idTipoCaso = tc.idTipoCaso INNER JOIN estado e ON t.idEstado = e.idEstado INNER JOIN prioridad p ON t.idPrioridad = p.idPrioridad INNER JOIN empresa em ON u.idEmpresa = em.idEmpresa ORDER BY t.idTicket DESC", (err, rows, fields) => {
                if (!err) {
                  console.log(rows);
                  callback(rows);
                } else {
                  console.log(err);
                }
              });
        });
    }

    usertickets(user_id, callback) {
      var conexion = new Conexion;

      conexion.connect(function (conn) {
          conn.query("SELECT t.idTicket, t.descripcion, t.fechaIngreso, e.nombre AS estado, p.nombre AS prioridad, tc.nombre AS tipocaso, CONCAT(u.nombre,' ',U.apellido) as usuario, em.nombre AS empresa FROM ticket t INNER JOIN usuario u ON t.idUsuario = u.idUsuario INNER JOIN tipo_caso tc ON t.idTipoCaso = tc.idTipoCaso INNER JOIN estado e ON t.idEstado = e.idEstado INNER JOIN prioridad p ON t.idPrioridad = p.idPrioridad INNER JOIN empresa em ON u.idEmpresa = em.idEmpresa WHERE u.idUsuario = '"+user_id+"' ORDER BY t.idTicket DESC", (err, rows, fields) => {
              if (!err) {
                console.log(rows);
                callback(rows);
              } else {
                console.log(err);
              }
            });
      });
  }

  ticketbyid(id_ticket, callback) {
    var conexion = new Conexion;

    conexion.connect(function (conn) {
        conn.query("SELECT * FROM ticket WHERE idTicket = "+id_ticket, (err, rows, fields) => {
            if (!err) {
              console.log(rows);
              callback(rows);
            } else {
              console.log(err);
            }
          });
    });
}

updateticket(id_ticket, estado,  callback) {
  var conexion = new Conexion;

  conexion.connect(function (conn) {
      conn.query("UPDATE ticket SET idEstado = "+estado+" WHERE idTicket ="+id_ticket, (err, rows, fields) => {
          if (!err) {
            console.log(rows);
            callback(rows);
          } else {
            console.log(err);
          }
        });
  });
}

registerticket(id_usuario, descripcion, tipocaso, prioridad, callback) {
  var conexion = new Conexion;

  conexion.connect(function (conn) {
      conn.query("INSERT INTO ticket (idTicket, descripcion, fechaIngreso, idUsuario, idTipoCaso, idEstado, idPrioridad) VALUES (null,'"+descripcion+"', CURDATE(), "+id_usuario+", "+tipocaso+", 1, "+prioridad+")", (err, rows, fields) => {
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

  module.exports = Ticket;