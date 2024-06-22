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
// This will be headers from sign in response with token in cookies,
// and we will use it to navigate to private page,
let headers: Record<string, string | string[]>;
let testToken = '';

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

    headers = response.headers;
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'You successfully created and signed in!',
    );
    expect(response.body.user.username).toBe(username);
    expect(response.body.user.id).toBeDefined();
  });

  it('should successfully navigate to private page', async () => {
    const response = await request
      .get('/api/test/private')
      .set('Cookie', [...headers['set-cookie']]);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('it is private page!');
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
    headers = response.headers;
    expect(response.status).toBe(200);
    expect(response.body.user).toBeDefined();
    expect(response.body.user.id).toBeDefined();
    expect(response.body.user.username).toBe(username);
    expect(response.body.user.roles).toBeDefined();
  });

  it('should successfully navigate to private page', async () => {
    const response = await request
      .get('/api/test/private')
      .set('Cookie', [...headers['set-cookie']]);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('it is private page!');
  });
  //TODO add test for logout
});

describe('Test get user details', () => {
  it('should return correct user details by provided token', async () => {
    const cookies = headers['set-cookie'] as string[];
    const token = cookies
      .find((el) => el.includes('token'))
      ?.split(';')[0]
      .split('=')[1];

    testToken = token as string;
    const response = await request
      .post('/api/auth/user-details')
      .send({ token });
    expect(response.status).toBe(200);
    expect(response.body.user).toBeDefined();
    expect(response.body.user.id).toBeDefined();
    expect(response.body.user.username).toBe(username);
  });

  it('should return nothing if token is not provided', async () => {
    const response = await request
      .post('/api/auth/user-details')
      .send({ token: '' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User is not authorized!');
  });

  it('should return nothing if token is not a string', async () => {
    const response = await request
      .post('/api/auth/user-details')
      .send({ token: 1234 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User is not authorized!');
  });

  it('should return nothing if token is incorrect', async () => {
    const response = await request
      .post('/api/auth/user-details')
      .send({ token: testToken + 1234 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User is not authorized!');
  });
});

describe('Test logout', () => {
  it('should return 200 and message', async () => {
    const response = await request
      .post('/api/auth/logout')
      .set('Cookie', [...headers['set-cookie']]);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('You successfully signed out!');
  });

  it('should return 401 if user was logout', async () => {
    const response = await request.get('/api/test/private');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Unauthorized!');
  });
});
