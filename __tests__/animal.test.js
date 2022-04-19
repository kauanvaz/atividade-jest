const fs = require('fs')
const request = require('supertest');
const app = require('../src/app');
const animalsData = require('../src/data/animals.json');

describe('Inserção de animais', () =>{
    afterAll(() => {
        while (animalsData.length > 0) {
            animalsData.pop();
        }
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData))
    });

    it('Deve cadastrar animal com sucesso', async () =>{
        const res = await request(app).post('/animais?nome=Spike&especie=Cachorro&idade=3');
        expect(res.status).toBe(201);
    });

    it('Deve falhar ao cadastrar pois idade não é um número', async () =>{
        const res = await request(app).post('/animais?nome=Mimi&especie=Gato&idade=jovem');
        expect(res.status).toBe(400);
    });

    it('Deve falhar ao cadastrar pois o nome é curto', async () =>{
        const res = await request(app).post('/animais?nome=J&especie=Hamster&idade=1');
        expect(res.status).toBe(400);
    });
});