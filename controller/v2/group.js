const Group = require('../../models/group');
const {Organization} = require('../../models/organization');
const {checkPermission, Permission, error} = require('./helpers');

module.exports = {
    // getGroupName: async (req, res, next) => {
    //     if (!checkPermission(req, Permission.SYSTEM_MANAGEMENT)) {
    //         return next(error.api.NO_PERMISSION);
    //     }
    //     const groupNumber = req.session.user.groupNumber;
    //     try {
    //         const group = await Group.findOne({groupNumber});
    //         return res.json({name: group ? group.name: null});
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    // setGroupName: async (req, res, next) => {
    //     if (!checkPermission(req, Permission.SYSTEM_MANAGEMENT)) {
    //         return next(error.api.NO_PERMISSION);
    //     }
    //     const groupNumber = req.session.user.groupNumber;
    //     const name = req.body.name;
    //     try {
    //         await Group.replaceOne({groupNumber}, {groupNumber, name}, {upsert: true});
    //         return res.json({message: `Current Group name is updated to ${name}`});
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    // no login required, used for registration
    // from user.js router
    getGroups: async (req, res, next) => {
        try {
            const groups = await Group.find({});
            return res.json({groups})
        } catch (e) {
            next(e);
        }
    },

    createGroup: async (req, res, next) => {
        let {groupNumber, name} = req.body;
        if (!groupNumber) {
            groupNumber = req.session.user.groupNumber;
        }
        const query = {groupNumber, name};
        try {
            const group = new Group({groupNumber, name});
            const result = await group.save();
            return res.json({result})
        } catch (e) {
            return res.status(500).json({e});
        }
    },

    // no login required, used for registration
    getOrganizations: async (req, res, next) => {
        const groupNumber = req.query.groupNumber;
        try {
            let organizations;
            if (groupNumber) {
                organizations = await Organization.find({groupNumber},);
            } else {
                organizations = await Organization.find();
            }
            return res.json({organizations});
        } catch (e) {
            next(e);
        }
    },
};
