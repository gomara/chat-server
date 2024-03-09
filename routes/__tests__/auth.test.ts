import request from 'supertest';
import express from 'express';

import {
  ServerInfo,
  clearDatabase,
  closeDatabase,
  dbTestConnect,
  testServerConnect,
  testServerStop,
} from '../../db/dbtest';

let serverInfo: ServerInfo | undefined;

beforeAll(async () => {
  serverInfo = await testServerConnect();
});

afterAll(async () => {
  await testServerStop();
  if (serverInfo) serverInfo.server.close();
});

describe('Register endpoint test ', () => {
  test('Post /register sucessfully', async () => {
    const response = await request(serverInfo.server).post('/auth/register').send({
      username: 'testuser',
      password: 'testpassword',
    });
    const { success, user } = response.body;

    expect(response.status).toBe(201);
    expect(success).toBe(true);
    expect(user.username).toBe('testuser');
  });
  test('Post /register with missing username and/or password', async () => {
    const response = await request(serverInfo.server).post('/auth/register').send({
      username: 'testuser',
    });
    const { success, message } = response.body;

    expect(response.status).toBe(400);
    expect(success).toBe(false);
    expect(message).toBe('Missing username and/or password');
  });
  test('Post /register with user already exists', async () => {
    const response = await request(serverInfo.server).post('/auth/register').send({
      username: 'testuser',
      password: 'testpassword',
    });
    const { success, message } = response.body;

    expect(response.status).toBe(409);
    expect(success).toBe(false);
    expect(message).toBe('User already exists');
  });
});

describe('Login endpoint test ', () => {
  test('Post /login sucessfully', async () => {
    const response = await request(serverInfo.server).post('/auth/login').send({
      username: 'testuser',
      password: 'testpassword',
    });
    const { success, authorization } = response.body;

    expect(response.status).toBe(200);
    expect(success).toBe(true);
    expect(authorization).toBeDefined();
  });
});
