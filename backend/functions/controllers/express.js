const express = require('express');
const client = require('prom-client');

const app = express();

// Define environment (can be 'production' or 'staging' based on deployment)
const environment = process.env.NODE_ENV || 'staging'; // Default to 'staging'

// Create a new registry
const register = new client.Registry();

// Default metrics collection with environment label
client.collectDefaultMetrics({ register, labels: { env: environment } });

// Define a custom gauge for HTTP requests, including the environment label
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'status_code', 'env'], // Add 'env' label here
});

app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ 
      route: req.route?.path || req.path, 
      method: req.method, 
      status_code: res.statusCode,
      env: environment // Add the environment to each metric
    });
  });
  next();
});

// Expose metrics at /metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(3000, () => {
  console.log(`Express server is running in ${environment} environment`);
});
