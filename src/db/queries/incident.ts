export default {
  createIncidentReport: `
    INSERT INTO incident(
      client_id,
      incident_desc,
      city,
      country,
      date,
      weather_report
    )
    VALUES($1, $2, $3, $4, $5, $6 )
    RETURNING *`,

  getClientIncidentsReport: `
    SELECT
      client_id,
      incident_desc,
      city,
      country,
      date,
      weather_report::json,
      created_at::DATE,
      updated_at::DATE
    FROM incident
    WHERE client_id = $1`,

  getAllIncidentsReport: `
    SELECT
      client_id,
      incident_desc,
      city,
      country,
      date,
      weather_report::json,
      created_at::DATE,
      updated_at::DATE
    FROM incident`,
};
