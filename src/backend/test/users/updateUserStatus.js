const chai = require('chai');
const expect = chai.expect;

const {agent} = require('../config');
const userLogin = require('../userLogin');

describe("Update a user's status. Used to disable or enable an account.", function () {
	const usernameTest = 'test';
	const passwordTest = 'test';

	const secondUsername = 'second';
	// const secondEmail = 'lester02@mail.com';

	before(async () => {
		await userLogin();
	});

	it("Check a user's status: active - success ", (done) => {
		this.timeout(10000);
		const urlStr = '/api/users/' + secondUsername + '/active/';
		agent
			.get(urlStr)
			.then(function (res) {
				console.log(res.body);
				expect(res).to.have.status(200);
				expect(res.body.success).to.be.true;
				expect(res.body.message).not.to.be.null;
				console.log(res.body.message);
				done();
			})
			.catch(function (err) {
				throw err;
			});
	});

	it('Put - set validated as true', async () => {
		this.timeout(10000);
		const res = await agent
			.put('/api/users/validated/' + secondUsername)
			.send({validated: true});
		expect(res).to.have.status(200);
		expect(res.body.success).to.be.true;
		console.log(res.body);
	});
	it('Put - set validated as false', async () => {
		this.timeout(10000);
		const res = await agent
			.put('/api/users/validated/' + secondUsername)
			.send({validated: false});
		expect(res).to.have.status(200);
		expect(res.body.success).to.be.true;
		console.log(res.body);
	});

	it("Update a user's status: active - true ", (done) => {
		this.timeout(10000);
		const activeValue = true;
		const urlStr = '/api/users/active/' + secondUsername;
		agent
			.put(urlStr)
			.send({active: activeValue})
			.then(function (res) {
				expect(res).to.have.status(200);
				expect(res.body.success).to.be.true;
				expect(res.body.message).to.deep.include(activeValue.toString());
				done();
			})
			.catch(function (err) {
				console.log(err);
			});
	});

	it("Update a user's status: active - false ", (done) => {
		this.timeout(10000);
		const activeValue = false;
		const urlStr = '/api/users/active/' + secondUsername;
		agent
			.put(urlStr)
			.send({active: activeValue})
			.then(function (res) {
				expect(res).to.have.status(200);
				expect(res.body.success).to.be.true;
				expect(res.body.message).to.deep.include(activeValue.toString());
				done();
			})
			.catch(function (err) {
				throw err;
			});
	});

	it("Update a user's status: error - no user ", (done) => {
		this.timeout(10000);
		const activeValue = false;

		const urlStr = '/api/users/active/' + 'no user';
		agent
			.put(urlStr)
			.send({active: activeValue})
			.then(function (res) {
				expect(res).to.have.status(400);
				expect(res.body.success).to.be.false;
				expect(res.body.message.errors).not.to.be.null;
				console.log(res.body.message);
				done();
			})
			.catch(function (err) {
				throw err;
			});
	});

	it("Update a user's status: 400 Bad Request ", (done) => {
		this.timeout(10000);
		const activeValue = '400 Bad Request';
		// Login firstly

		const urlStr = '/api/users/active/' + secondUsername;
		agent
			.put(urlStr)
			.send({active: activeValue})
			.then(function (res) {
				expect(res).to.have.status(500);
				expect(res.body.success).to.be.false;
				expect(res.body.message.errors).not.to.be.null;
				done();
			})
			.catch(function (err) {
				throw err;
			});
	});
});
