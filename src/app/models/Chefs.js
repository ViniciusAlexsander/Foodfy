const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  all(callback) {
    const query = `
      SELECT chefs.*,count(recipes) AS qntRecipes 
      FROM chefs LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      GROUP BY chefs.id
    `;
    db.query(query, function (err, results) {
      if (err)
        throw `Database Error! Erro na parte de 'ALL do models dos chefs' ${err}`;
      callback(results.rows);
    });
  },
  create(data, callback) {
    const query = `
      INSERT INTO chefs (
        name,
        avatar_url,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id
    `;

    const values = [data.name, data.avatar_url, date(Date.now()).iso];

    db.query(query, values, function (err, results) {
      if (err) throw `Database erro at create chef ${err}`;
      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    const query = `
    SELECT *
    FROM chefs
    WHERE chefs.id = $1`;
    db.query(query, [id], function (err, results) {
      if (err) throw `Database error at find chef ${err}`;
      callback(results.rows[0]);
    });
  },
  update(data, callback) {
    const query = `
      UPDATE chefs SET
      name=($1),
      avatar_url=($2)
      WHERE id=($3)
    `;
    const values = [data.name, data.avatar_url, data.id];

    db.query(query, values, function (err, results) {
      if (err) throw `Database error at uptade chef ${err}`;
      callback();
    });
  },
  delete(id, callback) {
    const query = `DELETE FROM chefs WHERE id=($1)`;

    db.query(query, [id], function (err, results) {
      if (err) throw `Database erro at delete chefs ${err}`;
      callback();
    });
  },
  findRecipe(chefId, callback) {
    const query = `
      SELECT * 
      FROM recipes
      WHERE chef_id = $1
    `;
    db.query(query, [chefId], function (err, results) {
      if (err) throw `Database error at findRecipe ${err}`;
      callback(results.rows);
    });
  },
  countRecipe(chefId, callback) {
    const query = `
      SELECT count(*) AS qntRecipes
      FROM recipes
      WHERE chef_id = $1
      GROUP BY chef_id
    `;
    db.query(query, [chefId], function (err, results) {
      if (err) throw `Database error at countRecipe ${err}`;
      callback(results.rows);
    });
  },
};
