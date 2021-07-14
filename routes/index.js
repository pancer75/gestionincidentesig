var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario');
var Ticket = require('../models/ticket');
var Atencion = require('../models/atencion');
var Analista = require('../models/analista');


/* GET home page. */
//Ruta inicial que muestra el login
router.get('/', function(req, res, next) {
  res.render('index');
});


router.post('/login', function(req, res, next) {

  var usuario = new Usuario();

  usuario.login(req.body.usuarioRed,req.body.clave, function (usuarios) {
    
    if(usuarios.length < 1) {
      res.render('index', { error: "Correo o contraseña incorrectos"});
      
    } else {
      //Guardar usuario en sesion
      req.session.user = usuarios[0];
      res.redirect('/tickets');
    }
    
  });
  
});

router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/');
});


router.get('/tickets', function(req, res, next) {

  
  if(req.session.user == (null || undefined)){
    res.redirect('/');
  }
  
  if (req.session.user.idTipo == 1) {
    res.redirect('/usertickets');
  } else {
    var tickets = new Ticket();
      
    tickets.alltickets(function(tickets) {
      
      res.render('alltickets', { tickets: tickets, usuario:req.session.user});
    });
  }
  
});



router.get('/usertickets', function(req, res, next) {
  //Redireccionando en caso de que no haya ningun usuario logueado
  if(req.session.user == (null || undefined)){
    res.redirect('/');
  }
  var tickets = new Ticket();

  tickets.usertickets(req.session.user.idUsuario, function(tickets) {
    if (tickets[0] == undefined) {
      res.render('usertickets', { error: "No tienes tickets para mostrar", usuario:req.session.user});
    } else {
    res.render('usertickets', { tickets: tickets, usuario:req.session.user});
    }
  });
    
  
});

router.get('/attentions', function(req, res, next) {
  //Redireccionando en caso de que no haya ningun usuario logueado
  if(req.session.user == (null || undefined)){
    res.redirect('/');
  }
  var atencion = new Atencion();

  atencion.allatentions(function(attentions) {
    if (attentions[0] == undefined) {
      res.render('attentions', { error: "No hay atenciones para mostrar", usuario:req.session.user});
    }
    res.render('attentions', { atencion: attentions, usuario:req.session.user});
  });
    
  
});

router.post('/attentions', function(req, res, next) {
  
  var atencion = new Atencion();

  atencion.dateattentions(req.body.date_desde, req.body.date_hasta, function(attentions) {
    if (attentions[0] == undefined) {
      res.render('attentions', { error: "No hay atenciones para mostrar", usuario:req.session.user});
    }
    res.render('attentions', { atencion: attentions, usuario:req.session.user});
  });
    
  
});

router.get('/analysts', function(req, res, next) {
  //Redireccionando en caso de que no haya ningun usuario logueado
  if(req.session.user == (null || undefined)){
    res.redirect('/');
  }
  var analista = new Analista();

  analista.analysts(function(analysts) {
    if (analysts[0] == undefined) {
      res.render('analistas', { error: "No hay atenciones para mostrar", usuario:req.session.user});
    }
    res.render('analistas', { analysts: analysts, usuario:req.session.user});
  });
    
  
});

router.get('/registerattention/:ticket_id', function(req, res, next) {
  //Redireccionando en caso de que no haya ningun usuario logueado
  if(req.session.user == (null || undefined)){
    res.redirect('/');
  }
  var atencion = new Atencion();

  atencion.registerattentions(req.session.user.idUsuario, req.params.ticket_id, function(ok) {
    if (ok < 1) {
      res.render('alltickets', { error: "No se puede", usuario:req.session.user});
    } else {
    res.render('exito', {usuario:req.session.user});
    }
  });
    
});

router.get('/ticketedit/:ticket_id', function(req, res, next) {
  //Redireccionando en caso de que no haya ningun usuario logueado
  if(req.session.user == (null || undefined)){
    res.redirect('/');
  }
  var ticket = new Ticket();

  ticket.ticketbyid(req.params.ticket_id, function(ticket) {
    res.render('editticket', {ticket:ticket, usuario:req.session.user});
  });
});  


router.post('/updateticket', function(req, res, next) {
  
  var tickets = new Ticket();

  tickets.updateticket(req.body.txt_id, req.body.combo_estado, function(ok) {
    if (ok < 1) {
      res.render('editticket', { error: "No hay atenciones para mostrar", usuario:req.session.user});
    } else {
    res.redirect('/registerattention/'+req.body.txt_id);
    }
  });
    
  
});

router.get('/ticketregister', function(req, res, next) {
  //Redireccionando en caso de que no haya ningun usuario logueado
  if(req.session.user == (null || undefined)){
    res.redirect('/');
  }
  
    res.render('ticketregister', {usuario:req.session.user});
}); 

router.post('/registerticket', function(req, res, next) {
  
  var tickets = new Ticket();

  tickets.registerticket(req.session.user.idUsuario, req.body.txt_descripcion, req.body.combo_tipo, req.body.combo_prioridad, function(ok) {
    if (ok < 1) {
      res.render('editticket', { error: "No hay atenciones para mostrar", usuario:req.session.user});
    } else {
    res.redirect('/tickets');
    }
  });
    
  
});

module.exports = router;
