import request from 'supertest';
import {app} from '../../app';
import {getRepository} from "typeorm";
import {Article} from "../../entity/Article";

const id = Math.floor(Math.random() * 1000000000);

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

it('returns an validation error if an invalid thumbs type is provided', async () => {
    await request(app)
        .post('/api/v1/articles/thumbs')
        .send({
            type: '',
            article_id: 1
        })
        .expect(422);

    await request(app)
        .post('/api/v1/articles/thumbs')
        .send({
            article_id: 1
        })
        .expect(422);
});

it('returns an validation error if an invalid thumbs article_id is provided', async () => {
    await request(app)
        .post('/api/v1/articles/thumbs')
        .send({
            type: 'up',
            article_id: ''
        })
        .expect(422);

    await request(app)
        .post('/api/v1/articles/thumbs')
        .send({
            type: 'up',
            article_id: id
        })
        .expect(422);
});

it('thump up an article with valid inputs', async () => {

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

    const articleId = createdArticle.body.data.id;

    await thumpUPArticle(articleId);

    const articleRepo = await getRepository(Article);
    const article = await articleRepo.findOneOrFail({
        where: {id: articleId},
    });

    expect(article.thumbs).toEqual("1");

});

it('thump down an article with valid inputs', async () => {

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

    const articleId = createdArticle.body.data.id;

    await thumpUPArticle(articleId);
    await thumpUPArticle(articleId);

    await request(app)
        .post('/api/v1/articles/thumbs')
        .send({
            type: 'down',
            body: 'sports description',
            article_id: articleId
        })
        .expect(200);

    const articleRepo = await getRepository(Article);
    const article = await articleRepo.findOneOrFail({
        where: {id: articleId},
    });

    expect(article.thumbs).toEqual("1");

});
