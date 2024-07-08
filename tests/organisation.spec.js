const request  = require('supertest');
const app  = require('../index');

descripe('Organisation Endpoints', () => {
    let token;

    beforeAll(async () => {
        const res = await request(app)
        .post('/auth/login')
        .send({
            email: 'doingstech55@gmail.com',
            password:'password'
        });
        token = res.body.data.accessToken;
    });

    it('shoul get all the organisations for a user', async() => {
        const res = await request(app)
        .get('/api/organisations')
        .set('Authorization', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    })


    it('should create a new organisation', async() => {
        const res = await request(app)
        .post('/api/organisations')
        .set('Authorization', token)
        .send({
            name:'new Organisation',
            description:'this is a new organisation'
        })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('data');
    })
})