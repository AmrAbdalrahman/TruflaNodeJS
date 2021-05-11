import request from 'supertest';
import {app} from '../../app';
import {getRepository} from "typeorm";
import {Author} from "../../entity/Author";

const createAuthor = () => {
    return request(app).post('/api/v1/authors/create').send({
        name: 'amr',
        job_title: 'software engineer',
    });
};

it('returns an validation error if an invalid author name is provided', async () => {
    await request(app)
        .post('/api/v1/authors/create')
        .send({
            name: '',
            job_title: 'software engineer'
        })
        .expect(422);

    await request(app)
        .post('/api/v1/authors/create')
        .send({
            job_title: 'software engineer'
        })
        .expect(422);
});

it('returns an validation error if an invalid author job_title is provided', async () => {
    await request(app)
        .post('/api/v1/authors/create')
        .send({
            name: 'amr',
            job_title: ''
        })
        .expect(422);

    await request(app)
        .post('/api/v1/authors/create')
        .send({
            name: 'amr',
        })
        .expect(422);
});

it('creates a author with valid inputs', async () => {

    const name = 'amr';
    const job_title = 'software engineer';

    await request(app)
        .post('/api/v1/authors/create')
        .send({
            name,
            job_title
        })
        .expect(201);

    const authRepo = await getRepository(Author);
    const author = await authRepo.find({order: {created_at: "DESC"}});

    expect(author.length).toBeGreaterThan(0);
    expect(author[0].name).toEqual(name);
    expect(author[0].job_title).toEqual(job_title);
});

it('returns a 404 if the author is not found', async () => {
    const id = Math.floor(Math.random() * 1000000000);
    await request(app).get(`/api/v1/authors/${id}`).send().expect(404);
});

it('returns the author if the author is found', async () => {

    const name = 'amr';
    const job_title = 'software engineer';

    const response = await request(app)
        .post('/api/v1/authors/create')
        .send({
            name,
            job_title
        })
        .expect(201);


    const authorResponse = await request(app)
        .get(`/api/v1/authors/${response.body.data.id}`)
        .send()
        .expect(200);

    expect(authorResponse.body.data.name).toEqual(name);
    expect(authorResponse.body.data.job_title).toEqual(job_title);
});

it('can fetch a list of authors', async () => {
    await createAuthor();
    await createAuthor();
    await createAuthor();

    const response = await request(app).get('/api/v1/authors/all').send().expect(200);

    expect(response.body.data.length).toBeGreaterThan(2);
});
