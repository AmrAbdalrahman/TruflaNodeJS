import request from 'supertest';
import {app} from '../../app';
import {Article} from "../../entity/Article";
import {getRepository} from "typeorm";

const id = Math.floor(Math.random() * 1000000000);

const createArticle = async () => {
   await request(app).post('/api/v1/authors/create').send({
        name: 'amr',
        job_title: 'software engineer',
    });

    await request(app).post('/api/v1/articles/create').send({
        title: 'first article',
        body: 'description',
        author_id: 1
    })
};

it('returns an validation error if an invalid article title is provided', async () => {
    await request(app)
        .post('/api/v1/articles/create')
        .send({
            title: '',
            body: 'sports body',
            author_id: 1
        })
        .expect(422);

    await request(app)
        .post('/api/v1/articles/create')
        .send({
            body: 'sports body',
            author_id: 1
        })
        .expect(422);
});

it('returns an validation error if an invalid article body is provided', async () => {
    await request(app)
        .post('/api/v1/articles/create')
        .send({
            title: 'first article',
            body: '',
            author_id: 1
        })
        .expect(422);

    await request(app)
        .post('/api/v1/articles/create')
        .send({
            title: 'first article',
            author_id: 1
        })
        .expect(422);
});

it('returns an validation error if an invalid article author_id is provided', async () => {
    await request(app)
        .post('/api/v1/articles/create')
        .send({
            title: 'first article',
            body: 'description',
            author_id: ''
        })
        .expect(422);

    await request(app)
        .post('/api/v1/articles/create')
        .send({
            title: 'first article',
            body: 'description',
            author_id: id
        })
        .expect(422);
});

it('creates an article with valid inputs', async () => {

    const title = 'new sports';
    const body = 'sports description';
    const author_id = 1;

    const response = await request(app)
        .post('/api/v1/articles/create')
        .send({
            title,
            body,
            author_id
        })
        .expect(201);

    const articleRepo = await getRepository(Article);
    const article = await articleRepo.findOneOrFail({
        where: {id: response.body.data.id},
        relations: ['author']
    });
    expect(article.title).toEqual(title);
    expect(article.body).toEqual(body);
    expect(article.author?.id).toEqual(`${author_id}`);
});


it('returns a 404 if the article is not found', async () => {
    await request(app).get(`/api/v1/articles/${id}`).send().expect(404);
});


it('returns the author if the author is found', async () => {

    const title = 'new sports';
    const body = 'sports description';
    const author_id = 1;

    const response = await request(app)
        .post('/api/v1/articles/create')
        .send({
            title,
            body,
            author_id
        })
        .expect(201);


    const articleResponse = await request(app)
        .get(`/api/v1/articles/${response.body.data.id}`)
        .send()
        .expect(200);

    expect(articleResponse.body.data.title).toEqual(title);
    expect(articleResponse.body.data.body).toEqual(body);
    expect(articleResponse.body.data.author_id).toEqual(`${author_id}`);
});

it('can fetch a list of articles', async () => {
    await createArticle();
    await createArticle();
    await createArticle();

    const response = await request(app).get('/api/v1/articles/all').send().expect(200);

    expect(response.body.data.length).toBeGreaterThan(2);
});
