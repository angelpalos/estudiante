
function indexcr(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT a.id_producto, a.id_usuario, b.name, a.cantidad, b.precio FROM carrito a, product b  WHERE a.id_producto=b.id_producto', (err, pers) => {
      if (err) {
        res.json(err);
      }
      console.log("--------", pers)
      res.render('pages/carrito', { pers, name: req.session.name });
    });
  });
}

function agregar(req, res) {
  const data = req.body
  const name = req.session.name

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM carrito WHERE id_producto = ? AND id_usuario = ?', [data.id_producto, name], (err, rows) => {
      if (rows.length > 0) {
        const can = rows[0].cantidad + 1
        req.getConnection((err, conn) => {
          conn.query('UPDATE carrito SET cantidad = ? WHERE id_producto= ? AND id_usuario = ?', [can, data.id_producto, name], (err, carr) => {
            if (err) throw err;
            res.redirect('/carrito')
          });
        });
      } else {
        req.getConnection((err, conn) => {
          conn.query('INSERT INTO carrito SET id_producto = ?, id_usuario = ?,cantidad = 1', [data.id_producto, name], (err, carr) => {
            if (err) throw err;
            res.redirect('/');

          });
        });
      }
    })
  })
}

function elimina(req, res) {
  const data = req.body;
  const name = req.session.name
  console.log(data)
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM carrito WHERE id_producto = ? AND id_usuario = ?', [data.id_producto, name], (err, rows) => {
      console.log(rows)
      const can = rows[0].cantidad - 1;
      if (can >= 1) {
        req.getConnection((err, conn) => {
          conn.query('UPDATE carrito SET cantidad = ? WHERE id_producto= ? AND id_usuario = ?', [can, data.id_producto, name], (errr, carr) => {
            if (errr) throw err;
            res.redirect('/carrito')
          });
        });
      } else {
        req.getConnection((errr, conn) => {
          conn.query('DELETE FROM carrito WHERE id_producto= ? AND id_usuario = ?', [data.id_producto, name], (err, carr) => {
            if (errr) throw err;
            res.redirect('/carrito');

          });
        });
      }
    })
  })
}

module.exports = {
  indexcr,
  agregar,
  elimina
}