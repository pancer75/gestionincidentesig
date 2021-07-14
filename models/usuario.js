var Conexion = require('../database/connection');

class Usuario {
    constructor() {
      
    }

    //Funcion que se encarga de el login
    login(usuariodered, clave, callback) {
        var conexion = new Conexion;
        conexion.connect(function (conn) {
            conn.query("SELECT u.*, t.nombre as tipo FROM usuario u INNER JOIN tipousuario t ON u.idTipo = t.idTipo WHERE u.usuarioDeRed = '"+usuariodered+"' and u.clave ='"+clave+"'", (err, rows, fields) => {
                if (!err) {
                  console.log(rows);
                  callback(rows);
                } else {
                  console.log(err);
                }
              });
        });
    }

    //Funcion que se encarga de registrar usuariosNormales (por el momento)
    registroUsuario(nombre, apellido, correo, clave, telefono, foto, callback) {
      var conexion = new Conexion;
      if (telefono == null || telefono == undefined || telefono == "") {
        telefono = 0;
      }
      conexion.connect(function (conn) {
        conn.query("INSERT INTO usuario (idUsuario, idTipo,nombre, apellido, correo, contraseña, descripcion, telefono, estado, categoria, foto) VALUES (null,'1','"+nombre+"','"+apellido+"','"+correo+"','"+clave+"',null,"+telefono+",null,null,'"+foto+"')", (err, rows, fields) => {
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

  

  module.exports = Usuario;