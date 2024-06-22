import supertest from 'supertest';
import { app, server } from '../index';
import { pool } from '../db/config';

afterAll((done) => {
  server.close(done);
  pool.end();
});

const request = supertest(app);
const username = Date.now().toString();
const password = Date.now().toString() + 'password';

describe('Test signup', () => {
  it('should return 400 if user not provided', async () => {
    const response = await request.post('/api/auth/signup');
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User data not found!');
  });

  it('should return 200 and new user', async () => {
    const response = await request.post('/api/auth/signup').send({
      user: {
        username: username,
        password: password,
      },
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User was successfully created!');
    expect(response.body.user.username).toBe(username);
    expect(response.body.user.id).toBeDefined();
  });

  it('should return 409 if user already exist', async () => {
    const response = await request.post('/api/auth/signup').send({
      user: {
        username: username,
        password: password,
      },
    });
    expect(response.status).toBe(409);
    expect(response.body.message).toBe(
      `User with username ${username} already exist!`,
    );
  });
});

describe('Test signin', () => {
  it('should return 400 if user not provided', async () => {
    const response = await request.post('/api/auth/signin');
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User data not found!');
  });

  it('should return 404 if user not found', async () => {
    const fakeUserName = Date.now() + '1234testets';
    const response = await request.post('/api/auth/signin').send({
      user: {
        username: fakeUserName,
        password: password,
      },
    });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      `User with username ${fakeUserName} not found!`,
    );
  });

  it('should return 401 if password is incorrect', async () => {
    const response = await request.post('/api/auth/signin').send({
      user: {
        username,
        password: 'fakepassword',
      },
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      `Password for user ${username} is incorrect!`,
    );
  });

  it('should return 200 and token if user data is correct', async () => {
    const response = await request.post('/api/auth/signin').send({
      user: {
        username,
        password,
      },
    });
    expect(response.status).toBe(200);
    expect(response.body.user).toBeDefined();
    expect(response.body.user.id).toBeDefined();
    expect(response.body.user.username).toBe(username);
    expect(response.body.user.roles).toBeDefined()
  });
  //TODO add test for user details and signin after signup
  //TODO add test for logout
});
