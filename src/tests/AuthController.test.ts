import supertest from 'supertest'
import {app, server} from "../index";
import {pool} from "../db/config";


// beforeAll(() => {
//     server = app.listen(3000);
// });
afterAll((done) => {
    server.close(done)
    pool.end()
})

const request = supertest(app)
const username = Date.now().toString()
const password = Date.now().toString() + 'password'

describe('Test signup', () => {
    it('should return 400 if user not provided',  async () => {
       const response = await request.post('/api/auth/signup')
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('User not found!')
    })

    it('should return 200 and new user',  async  () => {
       const response = await request.post('/api/auth/signup')
           .send({"user": {
                   "username": username,
                   "password": password
               }})
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('User was successfully created!')
        expect(response.body.user.username).toBe(username)
        expect(response.body.user.id).toBeDefined()
    })

    it('should return 409 if user already exist',  async  () => {
        const response = await request.post('/api/auth/signup')
            .send({"user": {
                    "username": username,
                    "password": password
                }})
        expect(response.status).toBe(409)
        expect(response.body.message).toBe(`User with username ${username} already exist!`)
    })
})

describe('Test signin', () => {

})

