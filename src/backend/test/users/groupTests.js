const chai = require('chai');
const expect = chai.expect;

const {agent} = require('../config');

describe.skip('group', function () {
	it('Get All groups - success', async () => {
		this.timeout(10000);
		const result = await agent.get('/api/v2/groups');
		console.table(result.body.groups);
	});

	it('Create a group', async () => {
		const result = await agent.post('/api/v2/groups').send({
			name: 'first group',
			groupNumber: 1,
		});
		console.log(result);
	});

	it('Create second group', async () => {
		const result = await agent.post('/api/v2/groups').send({
			name: 'second group',
			groupNumber: 2,
		});
		console.log(result);
	});
});
