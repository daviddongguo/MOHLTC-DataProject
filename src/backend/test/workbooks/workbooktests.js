const chai = require('chai');
const expect = chai.expect;

const {agent} = require('../config');
const userLogin = require('../userLogin');

describe('CRUD workbook', function () {
	before(async () => {
		try {
			await userLogin();
		} catch (error) {
			console.log(error);
		}
	});

	it('Get one workbook by filename - success', async () => {
		this.timeout(10000);
		const fileName = '2017-18 Annual Reconciliation Report V1.xlsx';
		const urlStr = '/api/v2/admin/workbook/' + fileName;
		try {
			var res = await agent.get(urlStr);
			expect(res).to.have.status(200);
			expect(res.body.success).to.be.true;
			expect(res.body.workbook).not.to.be.null;
		} catch (error) {
			console.log(error);
		}
	});

	it('Get one workbook by filename - Workbook does not exist', async () => {
		this.timeout(10000);
		const fileName = 'Workbook does not exist.xlsx';
		const urlStr = '/api/v2/admin/workbook/' + fileName;
		try {
			var res = await agent.get(urlStr);
			expect(res).to.have.status(404);
			expect(res.body.success).to.be.false;
			expect(res.body.workbook == null).to.be.true;
			expect(res.body.message).include('does not exist.');
		} catch (error) {
			console.log(error);
		}
	});

	it('Get all unfilled workbook : success)', (done) => {
		this.timeout(10000);
		const urlStr = '/api/v2/admin/workbooks';
		agent
			.get(urlStr)
			.then(function (res) {
				expect(res).to.have.status(200);
				expect(res.body.success).to.be.true;
				expect(res.body.workbooks).not.to.be.null;
				done();
			})
			.catch(function (err) {
				console.log(err);
			});
	});
});
