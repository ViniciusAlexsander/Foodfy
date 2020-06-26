const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  all() {
    const query = `
      SELECT chefs.*,count(recipes) AS qntRecipes 
      FROM chefs LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      GROUP BY chefs.id
    `;
    return db.query(query);
  },
  create(data) {
    const query = `
      INSERT INTO chefs (
        name,
        avatar_url,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id
    `;

    const values = [data.name, data.avatar_url, date(Date.now()).iso];

    return db.query(query, values);
  },
  find(id) {
    const query = `
    SELECT *
    FROM chefs
    WHERE chefs.id = $1`;
    return db.query(query, [id]);
  },
  update(data) {
    const query = `
      UPDATE chefs SET
      name=($1),
      avatar_url=($2)
      WHERE id=($3)
    `;
    const values = [data.name, data.avatar_url, data.id];

    return db.query(query, values);
  },
  delete(id) {
    const query = `DELETE FROM chefs WHERE id=($1)`;

    return db.query(query, [id]);
  },
  findRecipe(chefId) {
    const query = `
      SELECT * 
      FROM recipes
      WHERE chef_id = $1
    `;
    return db.query(query, [chefId]);
  },
  countRecipe(chefId) {
    const query = `
      SELECT count(*) AS qntRecipes
      FROM recipes
      WHERE chef_id = $1
      GROUP BY chef_id
    `;
    return db.query(query, [chefId]);
  },
};
