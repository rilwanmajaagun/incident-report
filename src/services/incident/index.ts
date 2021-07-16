/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import DB from 'src/db';
import { IncidentDto } from '@src/dto/incident.dto';

class IncidentService {
  createIncident(data: IncidentDto): Promise<any[]> {
    const payloads = [data.client_id, data.incident_desc, data.city, data.country, data.date, data.weatherReport];
    return DB.transact('createIncidentReport', payloads, 'incidentQuery');
  }

  getIncidents(id: string): Promise<any[]> {
    return DB.transact('getClientIncidentsReport', [id], 'incidentQuery');
  }

  getAllIncidents(): Promise<any[]> {
    return DB.transact('getAllIncidentsReport', [], 'incidentQuery');
  }
}
export default IncidentService;
