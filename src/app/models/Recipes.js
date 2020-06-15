const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  all(callback) {
    const query = `
    SELECT recipes.*,chefs.name AS author 
    FROM recipes JOIN chefs ON (chefs.id = recipes.chef_id)`;
    db.query(query, function (err, results) {
      if (err) throw `Database error at all recipes! ${err}`;

      callback(results.rows);
    });
  },
  create(data, callback) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING id
    `;

    const values = [
      data.chef_id,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error at create recipe! ${err}`;
      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    const query = `
    SELECT recipes.*, chefs.name AS author
    FROM recipes JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.id = $1
    `;
    db.query(query, [id], function (err, results) {
      if (err) throw `Database Error at find recipes ${err}`;

      callback(results.rows[0]);
    });
  },
  findTop6(callback) {
    const query = `
    SELECT recipes.*, chefs.name AS author 
    FROM recipes JOIN chefs ON (chefs.id = recipes.chef_id)
    LIMIT 6
    `;
    db.query(query, function (err, results) {
      if (err) throw `Database Error at findTop6 ${err}`;

      callback(results.rows);
    });
  },
  update(data, callback) {
    const query = `
      UPDATE recipes SET
      chef_id=($1),
      image=($2),
      title=($3),
      ingredients=($4),
      preparation=($5),
      information=($6)
      WHERE id=($7)
      `;

    const values = [
      data.chef_id,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database error at update recipe ${err}`;
      callback();
    });
  },
  delete(id, callback) {
    const query = `
    DELETE FROM recipes
    WHERE id = ($1)
    `;
    db.query(query, [id], function (err, results) {
      if (err) throw `Database Error at delete recipe! ${err}`;

      return callback();
    });
  },
  chefsSelect(callback) {
    const query = `
      SELECT name,id 
      FROM chefs
      ORDER BY name
    `;
    db.query(query, function (err, results) {
      if (err) throw `Database Error ${err}`;

      callback(results.rows);
    });
  },
  // filterRecipe(filter,callback) {
  //   const query
  // }
};
