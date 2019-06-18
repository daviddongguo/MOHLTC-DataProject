const chai = require('chai');
const expect = chai.expect;

const {agent} = require('../config');
const Attribute = require('../../models/attribute');
const User = require('../../models/user');

describe('CRUD filled workbook', function () {
    const oneId = 300001;
    const oneAttribute = 'id-300001';
    const oneGroupNumber = 1;
    const oneDescription = 'description: id-300001';

    const secondId = 300003;
    const secondAttribute = 'id-300003';
    const secondDescription = 'description: id-300003';

    before(done => {
        User.remove({}, () => {
        });

        // Sign up a new user
        agent
            .post('/api/signup/local')
            .send({
                username: 'lester',
                email: 'lester@le.com',
                password: 'lester',
                active: true,
                groupNumber: oneGroupNumber,
                permissions: [
                    'CRUD-workbook-template',
                    'system-management',
                    'workbook-query',
                    'create-delete-attribute-category',
                    'user-management'
                ]
            })
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                // Login
                agent
                    .post('/api/login/local')
                    .send({
                        username: 'lester',
                        password: 'lester'
                    })
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body.success).to.be.true;
                        done();
                    })
                    .catch(function (err) {
                        throw err;
                    });
            })
            .catch(function (err) {
                throw err;
            });


    });


    it('Get all filled workbook : success)', done => {
        this.timeout(10000);
        const urlStr = '/api/filled-workbooks' ;
        agent
            .get(urlStr)
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                expect(res.body.filledWorkbooks).not.to.be.null;
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });

    it('Get filled workbooks by filename - does not exists', done => {
        this.timeout(10000);
        const fileName = 'V1.xlsx';
        const urlStr = '/api/query/workbook?workbookName=' + fileName;
        agent
            .get(urlStr)
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                expect(res.body.filledWorkbooks == null).to.be.true;
                expect(res.body.message).include('does not exist');
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });

    it('Get filled workbooks  - filename is empty', done => {
        this.timeout(10000);
        const fileName = '                            ';
        const urlStr = '/api/query/workbook?workbookName=' + fileName;
        agent
            .get(urlStr)
            .then(function (res) {
                expect(res).to.have.status(400);
                console.log(res.body);
                expect(res.body.success).to.be.true;
                expect(res.body.filledWorkbooks == null).to.be.true;
                expect(res.body.message).include('can not be empty');
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });

    it('Get filled workbooks by filename - success', done => {
        this.timeout(10000);
        const fileName = '2018-19 CAPS LHIN Managed BLANK V1.xlsx';
        const urlStr = '/api/query/workbook?workbookName=' + fileName;
        agent
            .get(urlStr)
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                expect(res.body.filledWorkbooks.length >= 1).to.be.true;
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });

    it('Get special filled workbooks by filename and attribute id - success', done => {
        this.timeout(10000);
        const fileName = '2018-19 CAPS LHIN Managed BLANK V1.xlsx';
        const conditionStr = '&attId=100041840&catId=100640208';
        const urlStr = '/api/query/workbook?workbookName=' + fileName + conditionStr;
        agent
            .get(urlStr)
            .then(function (res) {
                expect(res).to.have.status(200);
                console.log(res.body);
                expect(res.body.success).to.be.true;
                expect(res.body.filledWorkbooks.length >= 1).to.be.true;
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });






    //FIXME: delete one attribute that used in workbook
});
