const request = require('supertest');
const app = require('../index')

descripe('Auth Endpoints', () => {

    it('should register a new user', async () => {

        const res = await request(app)
            .post('/auth/register')
            .send({
                firstName: 'Divine',
                lastName: 'Chukwuma',
                email: 'divinechukwuma982@gmail.com',
                password: 'password',
                phone: '09026422525'
            });
          expect(res.statusCode).toEqual(201);
          expect(res.body).toHaveProperty('data');
    })

    it('should login a user', async() => {
        const res = await request(app)
        .post('/auth/login')
        .send({
            email:'divinechukwuma982@gmail.com',
            password:'password',
        });
       expect(res.statusCode) .toEqual(200);
       expect(res.body).toHaveProperty('data');
    })

})