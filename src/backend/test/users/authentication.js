const chai = require('chai');
const expect = chai.expect;

const config = require('../config');
const globalConfig = require('../../config/config');

const requester = config.requester;

const User = require('../../models/user');

describe('Local Authentication', function () {
	this.timeout(10000);
	before(async () => {
		await User.remove({username: 'three'}, () => {});
	});
	it('register a user named three', (done) => {
		requester
			.post('/api/signup/local')
			.send({
				username: 'three',
				password: 'three',
				email: 'manage@mail.com',
				organization: 'King Hospital',
				groupNumber: 1, // can also be string
				firstName: 'firstName',
				lastName: 'lastName',
				phoneNumber: '1212122',
				password: 'test',
			})
			.then((res) => {
				expect(res).to.have.status(200);
				expect(res.body.success).to.be.true;
				done();
			})
			.catch(function (err) {
				throw err;
			});
	});

	it('Log in to the registered account', (done) => {
		requester
			.post('/api/login/local')
			.send({
				username: 'test',
				password: 'test',
			})
			.then((res) => {
				expect(res).to.have.status(200);
				expect(res.body.success).to.be.true;
				done();
			})
			.catch(function (err) {
				throw err;
			});
	});
});
