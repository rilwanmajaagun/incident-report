import request from 'supertest';
import faker from 'faker';
import nock from 'nock';
import app from '@src/index';
import config from '@src/config/setup';

describe('Auth', () => {
  describe('register', () => {
    it('should return error if payload contains missing field', async () => {
      const { body } = await request(app).post('/api/v1/auth/register').send({
        email: faker.internet.email(),
        password: '1234567890',
      });
      expect(body.status).toEqual('fail');
      expect(body).toHaveProperty('errors');
    });
    it('should return success registering a client', async () => {
      const { body } = await request(app).post('/api/v1/auth/register').send({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: 'koko@gmail.com',
        password: '1234567890',
      });
      expect(body).toHaveProperty('data');
      expect(body.status).toEqual('success');
      expect(body.message).toEqual('Client created successfully');
    });
    it('should return error if email already exist', async () => {
      const { body } = await request(app).post('/api/v1/auth/register').send({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: 'koko@gmail.com',
        password: '1234567890',
      });
      expect(body.status).toEqual('fail');
      expect(body.message).toEqual('Email Already Exist');
    });
  });

  describe('login', () => {
    it('should return error if email is missing in payload', async () => {
      const { body } = await request(app).post('/api/v1/auth/login').send({
        password: '1234rrr',
      });
      expect(body.status).toEqual('fail');
      expect(body).toHaveProperty('errors');
    });
    it('should return error if password is invalid', async () => {
      const { body } = await request(app).post('/api/v1/auth/login').send({
        email: 'koko@gmail.com',
        password: '1234rrr',
      });
      expect(body.status).toEqual('fail');
      expect(body.message).toEqual('Incorrect login details');
    });
    it('should return error if email is invalid', async () => {
      const { body } = await request(app).post('/api/v1/auth/login').send({
        email: 'kok@gmail.com',
        password: '1234567890',
      });
      expect(body.status).toEqual('fail');
      expect(body.message).toEqual('Incorrect login details');
    });
    it('should login', async () => {
      const { body } = await request(app).post('/api/v1/auth/login').send({
        email: 'koko@gmail.com',
        password: '1234567890',
      });
      process.env.ClIENT_TOKEN = body.data.token;
      expect(body).toHaveProperty('data');
      expect(body.status).toEqual('success');
      expect(body.message).toEqual('Client logged in successfully');
    });
  });

  describe('incident', () => {
    it('should create incident report', async () => {
      nock('https://api.openweathermap.org')
        .get('/data/2.5/weather')
        .query({ q: 'lagos', appid: `${config?.WEATHER_API_KEY}` })
        .reply(200, {
          coord: {
            lon: 145.77,
            lat: -16.92,
          },
          weather: [
            {
              id: 802,
              main: 'Clouds',
              description: 'scattered clouds',
              icon: '03n',
            },
          ],
          base: 'stations',
          main: {
            temp: 300.15,
            pressure: 1007,
            humidity: 74,
            temp_min: 300.15,
            temp_max: 300.15,
          },
          visibility: 10000,
          wind: {
            speed: 3.6,
            deg: 160,
          },
          clouds: {
            all: 40,
          },
          dt: 1485790200,
          sys: {
            type: 1,
            id: 8166,
            message: 0.2064,
            country: 'AU',
            sunrise: 1485720272,
            sunset: 1485766550,
          },
          id: 2172797,
          name: 'Cairns',
          cod: 200,
        });
      const { body } = await request(app)
        .post('/api/v1/incident')
        .set({ Authorization: process.env.ClIENT_TOKEN })
        .send({
          incident_desc: faker.lorem.sentences(),
          city: 'lagos',
          country: faker.address.country(),
          date: '2020-01-20',
        });
      expect(body).toHaveProperty('data');
      expect(body.status).toEqual('success');
      expect(body.message).toEqual('Incident Reports created successfully');
    });
    it('should get all incident', async () => {
      const { body } = await request(app).get('/api/v1/incident').set({ Authorization: process.env.ClIENT_TOKEN });
      expect(body).toHaveProperty('data');
      expect(body.status).toEqual('success');
      expect(body.message).toEqual('Incident Reports fetched successfully');
    });
  });
});
