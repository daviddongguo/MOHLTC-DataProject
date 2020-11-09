const chai = require('chai');
const expect = chai.expect;

const {agent, requester} = require('../config');

describe('Query the current user logged in.', function () {
	const oneUsername = 'test';
	const onePassword = 'test';

	it('when not logged in', (done) => {
		this.timeout(10000);
		requester
			.get('/api/users/current/')
			.then((res) => {
				console.log(res.body);
				expect(res.body.success).to.be.true;
				expect(res.body.user).to.equal(null);
				done();
			})
			.catch(function (err) {
				throw err;
			});
	});

	it('when a user logged in', (done) => {
		this.timeout(10000);
		// Login firstly
		agent
			.post('/api/login/local')
			.send({
				username: oneUsername,
				password: onePassword,
			})
			.then((res) => {
				expect(res).to.have.status(200);
				expect(res.body.success).to.be.true;
				return agent
					.get('/api/users/current/')
					.then(function (res) {
						expect(res).to.have.status(200);
						expect(res.body.success).to.be.true;
						expect(res.body.user).to.deep.include({
							username: oneUsername,
						});
						console.log(res.body.user.username);
						done();
					})
					.catch(function (err) {
						throw err;
					});
			});
	});
});
