const chai = require('chai');
const expect = chai.expect;

const {agent} = require('../config');

const User = require('../../models/user');
const Package = require('../../models/package/package');

describe('CRUD package', function () {

    before(done => {
        Package.remove({name: 'package02'}, () => {
        });

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
    });

    xit('GET by user name and package name - success', done => {
        this.timeout(10000);
        const urlStr = '/api/admin/lester/packages/already exists';
        agent
            .get(urlStr)
            .then(function (res) {
                console.table(res.body.packages);
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });
    xit('GET by  package name /packages/package02 - success', done => {
        this.timeout(10000);
        const urlStr = '/api/admin/packages/already exists';
        agent
            .get(urlStr)
            .then(function (res) {
                console.table(res.body.packages);
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });
    xit('GET by all based current user - success', done => {
        this.timeout(10000);
        const urlStr = '/api/packages';
        agent
            .get(urlStr)
            .then(function (res) {
                console.table(res.body.packages);
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });
    xit('GET by lester - success', done => {
        this.timeout(10000);
        const urlStr = '/api/admin/lester/packages';
        agent
            .get(urlStr)
            .then(function (res) {
                console.table(res.body.packages);
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });
    xit('GET by user name - does not exist', done => {
        this.timeout(10000);
        const urlStr = '/api/admin/xxx/packages';
        agent
            .get(urlStr)
            .then(function (res) {
                console.log(res.body.message);
                expect(res).to.have.status(400);
                expect(res.body.success).to.be.false;
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });
   xit('GET by package name - does not exist', done => {
        this.timeout(10000);
        const urlStr = '/api/packages/111';
        agent
            .get(urlStr)
            .then(function (res) {
                console.table(res.body);
                expect(res).to.have.status(400);
                expect(res.body.success).to.be.false;
                expect(res.body.message).include('not exist');
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });
    it('Post - no end Date', done => {
        this.timeout(10000);
        const urlStr = '/api/admin/packages';
        agent
            .post(urlStr)
            .then(function (res) {
                console.log(res.body);
                expect(res).to.have.status(400);
                expect(res.body.success).to.be.false;
                expect(res.body.message).include('endDate can not be empty.');
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });
    it('Post - start date less than end date', done => {
        this.timeout(10000);
        const urlStr = '/api/admin/packages';
        agent
            .post(urlStr)
            .send({
                // name: 'name did not exist',
                name: 'package03',
                startDate: Date.now(),
                endDate: Date.parse('1988/01/01'),
                userIds: ['5d4ae3e5bf54622ca035fd62', '5d4ae3e5bf54622ca035fd61'],
                workbookIds: ['5d499447d8586ddfbf06a031', '5d0cec736a9cb34624beaa5b'],
            })
            .then(function (res) {
                console.log(res.body);
                expect(res).to.have.status(400);
                expect(res.body.success).to.be.false;
                expect(res.body.message).include('startDate must be less than endDate');
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });
    it('Post - package already exists', done => {
        this.timeout(10000);
        const urlStr = '/api/admin/packages';
        agent
            .post(urlStr)
            .send({
                name: 'already exists',
                userIds: ['5d4ae3e5bf54622ca035fd62', '5d4ae3e5bf54622ca035fd61'],
                workbookIds: ['5d499447d8586ddfbf06a031', '5d0cec736a9cb34624beaa5b'],
                startDate: Date.now(),
                endDate: Date.parse('2025/01/01'),
            })
            .then(function (res) {
                console.log(res.body);
                expect(res).to.have.status(400);
                expect(res.body.success).to.be.false;
                expect(res.body.message).include('already exists');
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });
    it('Post create new package02 - success', done => {
        // name did not exist
        this.timeout(10000);
        const urlStr = '/api/admin/packages';
        agent
            .post(urlStr)
            .send({
                // name: 'name did not exist',
                name: 'package02',
                published: true,
                startDate: Date.now(),
                endDate: Date.parse('2025/01/01'),
                userIds: ['5d4ae3e5bf54622ca035fd62', '5d4ae3e5bf54622ca035fd61'],
                workbookIds: ['5d499447d8586ddfbf06a031', '5d0cec736a9cb34624beaa5b'],
            })
            .then(function (res) {
                console.table(res.body);
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });

    it('Post create new package03... - success', done => {
        // name did not exist
        this.timeout(10000);
        const urlStr = '/api/admin/packages';
        agent
            .post(urlStr)
            .send({
                // name: 'name did not exist',
                name: 'package03',
                published: true,
                startDate: Date.now(),
                endDate: Date.parse('2025/01/01'),
                userIds: ['5d4ae3e5bf54622ca035fd62', '5d4ae3e5bf54622ca035fd61'],
                workbookIds: ['5d499447d8586ddfbf06a031', '5d0cec736a9cb34624beaa5b'],
            })
            .then(function (res) {
                console.table(res.body);
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });
    it('Put update the status of published - success', done => {
        // name did not exist
        this.timeout(10000);
        const urlStr = '/api/admin/packages/package02';
        agent
            .put(urlStr)
            .send({
                // published: true,
                endDate:Date.parse('2020/03/01'),
                workbookIds: [ '5d0cec736a9cb34624beaa5b'],
            })
            .then(function (res) {
                console.table(res.body);
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                console.log(res.body.package);
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });

    it('Put  - error end date', done => {
        // name did not exist
        this.timeout(10000);
        const urlStr = '/api/admin/packages/package02';
        agent
            .put(urlStr)
            .send({
                // start:Date.parse('1980/03/01'),
                endDate:Date.parse('1980/02/01'),
                workbookIds: [ '5d0cec736a9cb34624beaa5b'],
            })
            .then(function (res) {
                console.table(res.body);
                expect(res).to.have.status(400);
                expect(res.body.success).to.be.false;
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });
    it('Delete package03... - success', done => {
        // name did not exist
        this.timeout(10000);
        const urlStr = '/api/admin/packages/package03';
        agent
            .delete(urlStr)
            .then(function (res) {
                console.table(res.body);
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });
})
;
