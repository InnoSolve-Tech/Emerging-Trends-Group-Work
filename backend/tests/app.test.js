const request = require('supertest');
const express = require('express');

const app = express();
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'API is working!' });
});

describe('GET /api/test', () => {
  it('should return a 200 status and a message', async () => {
    const res = await request(app).get('/api/test');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'API is working!');
  });
});
