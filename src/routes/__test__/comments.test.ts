import request from 'supertest';
import {app} from '../../app';
import {getRepository} from "typeorm";
import {Article} from "../../entity/Article";

it('returns an validation error if an invalid comment is provided', async () => {
    await request(app)
        .post('/api/v1/articles/addComment')
        .send({
            comment: '',
            user_id: 1,
            article_id: 1
        })
        .expect(422);

    await request(app)
        .post('/api/v1/articles/addComment')
        .send({
            user_id: 1,
            article_id: 1
        })
        .expect(422);
});

it('returns an validation error if an invalid user_id is provided', async () => {
    await request(app)
        .post('/api/v1/articles/addComment')
        .send({
            comment: 'first comment',
            user_id: '',
            article_id: 1
        })
        .expect(422);

    await request(app)
        .post('/api/v1/articles/addComment')
        .send({
            comment: 'first comment',
            article_id: 1
        })
        .expect(422);
});

it('returns an validation error if an invalid article_id is provided', async () => {
    await request(app)
        .post('/api/v1/articles/addComment')
        .send({
            comment: 'first comment',
            user_id: 1,
            article_id: ''
        })
        .expect(422);

    await request(app)
        .post('/api/v1/articles/addComment')
        .send({
            comment: 'first comment',
            user_id: 1,
        })
        .expect(422);
});

it('creates an comment with valid inputs', async () => {
    const createdAuthor = await request(app)
        .post('/api/v1/authors/create')
        .send({
            name: 'amr',
            job_title: 'software engineer',
        }).expect(201);

    const createdArticle = await request(app)
        .post('/api/v1/articles/create')
        .send({
            title: 'new sports',
            body: 'sports description',
            author_id: createdAuthor.body.data.id
        })
        .expect(201);

    const comment = 'first comment';
    const article_id = createdArticle.body.data.id;
    const user_id = createdAuthor.body.data.id;

    const response = await request(app)
        .post('/api/v1/articles/addComment')
        .send({
            comment,
            user_id,
            article_id
        })
        .expect(201);

    const articleRepo = await getRepository(Article);

    const article = await articleRepo.findOneOrFail({
        where: {id: createdArticle.body.data.id},
        relations: ['comments']
    });

    expect(article.comments![0].id).toEqual(`${response.body.data.id}`);
});

