export default {
  register: `
    INSERT INTO client(
      first_name,
      last_name,
      email,
      password
    )
    VALUES($1, $2, $3, $4)
    RETURNING *`,

  getClientByEmail: `
    SELECT
      id,
      first_name,
      email,
      password,
      is_active,
      created_at,
      updated_at
    FROM client
    WHERE email = $1`,
};
