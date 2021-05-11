import request from 'supertest';
import {app} from '../../app';
import {Article} from "../../entity/Article";
import {getRepository} from "typeorm";

const id = Math.floor(Math.random() * 1000000000);

const createArticle = async (title: string = 'first article', body: string = 'description', author_id?: string) => {
    const createdAuthor = await request(app).post('/api/v1/authors/create').send({
        name: 'amr',
        job_title: 'software engineer',
    }).expect(201);

    return request(app).post('/api/v1/articles/create').send({
        title,
        body,
        author_id: author_id ? author_id : createdAuthor.body.data.id
    }).expect(201);
};

const thumpUPArticle = async (articleId: any) => {
    await request(app)
        .post('/api/v1/articles/thumbs')
        .send({
            type: 'up',
            body: 'sports description',
            article_id: articleId
        })
        .expect(200);
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

    const createdAuthor = await request(app).post('/api/v1/authors/create').send({
        name: 'amr',
        job_title: 'software engineer',
    }).expect(201);

    const title = 'new sports';
    const body = 'sports description';
    const author_id = createdAuthor.body.data.id;

    const response = await createArticle(title, body, author_id);

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


it('returns the article if the article is found', async () => {

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

it('can fetch a list of articles sort by thumbs up', async () => {

    const articleRepo = await getRepository(Article);
    await articleRepo.delete({});

    const createdFirstArticle = await createArticle();
    const createdSecondArticle = await createArticle();
    await createArticle();

    await thumpUPArticle(createdFirstArticle.body.data.id);
    await thumpUPArticle(createdFirstArticle.body.data.id);
    await thumpUPArticle(createdSecondArticle.body.data.id);


    const response = await request(app).get('/api/v1/articles/all?sortBy=thumbs_up').send().expect(200);

    expect(response.body.data.length).toEqual(3);
    expect(response.body.data[0].thumbs).toEqual("2");
    expect(response.body.data[1].thumbs).toEqual("1");
    expect(response.body.data[2].thumbs).toEqual("0");
});

it('search for article through title body ', async () => {

    const articleRepo = await getRepository(Article);
    await articleRepo.delete({});

    await createArticle();
    await createArticle('sports', 'description sports');
    await createArticle('second sports', 'description sports full text');


    const response = await request(app).post('/api/v1/articles/search')
        .send({"text": "sports"})
        .expect(200);

    expect(response.body.data.length).toEqual(2);
    expect(response.body.data[0].title).toEqual("sports");
    expect(response.body.data[1].body).toEqual("description sports full text");

});

