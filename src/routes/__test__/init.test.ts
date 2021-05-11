import request from 'supertest';
import {app} from '../../app';

it('check the app works well', async () => {
    await request(app)
        .get('/api/v1/health-check')
        .send({}).expect(200);
});
