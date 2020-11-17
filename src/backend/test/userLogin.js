const globalConfig = require('../config/config');
const User = require('../models/user');

const {agent} = require('./config');

const userLogin = async () => {
	try {
		await User.deleteMany({username: 'guest'});

		await agent.post('/api/signup/local').send({
			username: 'second',
			email: 'second@mail.com',
			password: 'second',
			active: true,
			validated: true,
			organization: 'IT Cluster',
			groupNumber: 1, // can also be string
			firstName: 'firstName',
			lastName: 'lastName',
			phoneNumber: '1212122',
			permissions: Object.values(globalConfig.permissions),
		});
		// await agent.get('/api/logout');
		await agent.post('/api/signup/local').send({
			username: 'guest',
			email: 'guest@mail.com',
			password: 'guest',
			active: true,
			validated: true,
			organization: 'IT Cluster',
			groupNumber: 1, // can also be string
			firstName: 'firstName',
			lastName: 'lastName',
			phoneNumber: '1212122',
			permissions: Object.values(globalConfig.permissions),
		});
		await agent.post('/api/login/local').send({
			username: 'guest',
			password: 'guest',
		});
	} catch (error) {
		console.log(err);
	}
};

module.exports = userLogin;
