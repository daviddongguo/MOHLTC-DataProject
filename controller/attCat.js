const Attribute = require('../models/attribute');
const Category = require('../models/category');
const Workbook = require('../models/workbook');
const error = require('../config/error');
const config = require('../config/config');

function checkPermission(req) {
    return req.session.user.permissions.includes(config.permissions.ATTRIBUTE_CATEGORY_MANAGEMENT);
}

module.exports = {
    checkPermission: checkPermission,

    user_add_att: (req, res, next) => {

        if (!checkPermission(req)) {
            return res.status(403).json({success: false, message: error.api.NO_PERMISSION});
        }

        const attribute = req.body.attribute;
        const id = req.body.id;
        const description = req.body.description;
        const groupNumber = req.session.user.groupNumber;
        if (attribute === '') {
            return res.status(400).json({success: false, message: 'Attribute cannot be empty.'});
        }
        Attribute.findOne(
            {id: id, groupNumber: groupNumber},
            (err, attribute) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({success: false, message: err.message});
                }

                if (attribute) {
                    return res.status(400).json({
                        success: false, message: 'Attribute ' + attribute.attribute + ' exists.'
                    });
                } else {
                    let newAttribute = new Attribute({
                        id: id,
                        description: description,
                        attribute: req.body.attribute,
                        groupNumber: groupNumber
                    });
                    newAttribute.save((err, updatedAttribute) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        const messageStr =
                            'Attribute(id: ' +
                            updatedAttribute.id +
                            ' , ' +
                            updatedAttribute.attribute +
                            ') added.';
                        return res.json({success: true, message: messageStr});
                    });
                }
            }
        );
    },

    user_add_atts: (req, res) => {
        if (!checkPermission(req)) {
            return res.status(403).json({success: false, message: error.api.NO_PERMISSION});
        }

        const attributes = req.body.attributes;
        const groupNumber = req.session.user.groupNumber;
        // save multiple documents to the collection
        // FIXME: when an record is duplicate, all records can not insert
        Attribute.insertMany(attributes, function (err, docs) {
            let message = '';
            if (err) {
                message = err.errmsg;
                return res.status(500).json({success: false, message: message});
            }
            message = docs.length + ' attributes added.';
            return res.json({success: true, message: message, docs: docs});
        });
    },
    user_add_cats: (req, res) => {
        if (!checkPermission(req)) {
            return res.status(403).json({success: false, message: error.api.NO_PERMISSION});
        }

        const categories = req.body.categories;
        const groupNumber = req.session.user.groupNumber;
        // save multiple documents to the collection
        Category.insertMany(categories, function (err, docs) {
            let msgString = '';
            if (err) {
                msgString = err.errmsg;
                return res.status(500).json({success: false, message: msgString});
            }
            msgString = docs.length + ' categories added.';
            return res.json({success: true, message: msgString, docs: docs});
        });
    },

    user_delete_att: (req, res, next) => {
        if (!checkPermission(req)) {
            return res.status(403).json({success: false, message: error.api.NO_PERMISSION});
        }
        const attribute = req.body.data;
        const groupNumber = req.session.user.groupNumber;
        const existAttribute = [];
        var existAttribute_othergroup = false;
        Workbook.find({}, (err, workbooks) => {
            if (err) {
                return res.status(400).json({success: false, message: err});
            }
            for (var i = 0; i < workbooks.length; i++) {
                console.log(workbooks.length);
                var workbookData = workbooks[i].data;
                console.log(workbookData.length);
                for (var workbookSheetName in workbookData) {
                    var workbookSheet = workbookData[workbookSheetName];
                    var workbookAttributes = workbookSheet[0];
                    console.log(workbookAttributes.length);
                    for (var h = 0; h < workbookAttributes.length; h++) {
                        console.log(workbookAttributes[h]);
                        if (attribute == workbookAttributes[h]) {
                            if (workbooks[i].groupNumber === groupNumber) {
                                existAttribute.push(
                                    workbooks[i].name + '/' + workbookSheetName
                                );
                            } else {
                                existAttribute_othergroup = true;
                            }
                        }
                    }
                }
            }
            if (existAttribute.length === 0 && !existAttribute_othergroup) {
                Attribute.deleteOne(
                    {attribute: attribute, groupNumber: groupNumber},
                    err => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({success: false, message: err});
                        }
                        return res.json({
                            success: true,
                            message: 'Deleted attribute ' + attribute
                        });
                    }
                );
            } else {
                if (existAttribute.length !== 0) {
                    var message =
                        'The attribute ' +
                        '"' +
                        attribute +
                        '"' +
                        ' has been used in ';
                    for (var i = 0; i < existAttribute.length - 1; i++) {
                        message = message + existAttribute[i] + ', ';
                    }
                    message =
                        message +
                        existAttribute[existAttribute.length - 1] +
                        '. ';
                }
                if (existAttribute_othergroup) {
                    message =
                        message +
                        'This attribute has been used in other groups!';
                }
                console.log(message);
                return res.json({success: false, message: message});
            }
        });
    },

    user_delete_cat: (req, res, next) => {
        if (!checkPermission(req)) {
            return res
                .status(403)
                .json({success: false, message: error.api.NO_PERMISSION});
        }
        const category = req.body.data;
        const groupNumber = req.session.user.groupNumber;
        const existCategory = [];
        var existCategory_othergroup = false;
        Workbook.find({}, (err, workbooks) => {
            if (err) {
                return res.status(400).json({success: false, message: err});
            }
            for (var i = 0; i < workbooks.length; i++) {
                console.log(workbooks.length);
                var workbookData = workbooks[i].data;
                console.log(workbookData.length);
                for (var workbookSheetName in workbookData) {
                    var workbookSheet = workbookData[workbookSheetName];
                    for (var j = 0; j < workbookSheet.length; j++) {
                        if (category == workbookSheet[j][0]) {
                            if (workbooks[i].groupNumber === groupNumber) {
                                existCategory.push(
                                    workbooks[i].name + '/' + workbookSheetName
                                );
                            } else {
                                existCategory_othergroup = true;
                            }
                        }
                    }
                }
            }
            if (existCategory.length === 0 && !existCategory_othergroup) {
                Category.deleteOne(
                    {category: category, groupNumber: groupNumber},
                    err => {
                        if (err) {
                            console.log(err);
                            return res
                                .status(500)
                                .json({success: false, message: err});
                        }
                        return res.json({
                            success: true,
                            message: 'Deleted category ' + category
                        });
                    }
                );
            } else {
                if (existCategory.length !== 0) {
                    var message =
                        'The category ' +
                        '"' +
                        category +
                        '"' +
                        ' has been used in ';
                    for (var i = 0; i < existCategory.length - 1; i++) {
                        message = message + existCategory[i] + ', ';
                    }
                    message =
                        message +
                        existCategory[existCategory.length - 1] +
                        '. ';
                }
                if (existCategory_othergroup) {
                    message =
                        message +
                        'This category has been used in other groups!';
                }
                console.log(message);
                return res.json({success: false, message: message});
            }
        });
    },

    user_delete_atts: (req, res, next) => {
        if (!checkPermission(req)) {
            return res
                .status(403)
                .json({success: false, message: error.api.NO_PERMISSION});
        }
        const groupNumber = req.session.user.groupNumber;
        const ids = req.body.ids;
        let fails = [],
            promiseArr = [];

        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            // add to promise chain
            promiseArr.push(
                new Promise((resolve, reject) => {
                    Attribute.deleteOne({id, groupNumber})
                        .then(result => resolve())
                        .catch(err => {
                            console.log(err);
                            fails.push(id);
                        });
                })
            );
        }

        Promise.all(promiseArr).then(() => {
            if (fails.length !== 0) {
                return res.json({
                    success: false,
                    message: 'Failed to remove attribute id: ' + fails
                });
            }
            return res.json({
                success: true,
                message: 'Success removed attribute id: ' + ids + '.'
            });
        });
    },

    user_delete_cats: (req, res, next) => {
        if (!checkPermission(req)) {
            return res
                .status(403).json({success: false, message: error.api.NO_PERMISSION});
        }
        const groupNumber = req.session.user.groupNumber;
        const ids = req.body.ids;
        let fails = [],
            promiseArr = [];

        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            // add to promise chain
            promiseArr.push(
                new Promise((resolve, reject) => {
                    Category.deleteOne({id, groupNumber})
                        .then(result => resolve())
                        .catch(err => {
                            console.log(err);
                            fails.push(id);
                        });
                })
            );
        }

        Promise.all(promiseArr).then(() => {
            if (fails.length !== 0) {
                return res.json({
                    success: false,
                    message: 'Failed to remove category id: ' + fails
                });
            }
            return res.json({
                success: true,
                message: 'Success removed category id: ' + ids + '.'
            });
        });
    },

    user_add_cat: (req, res, next) => {
        if (!checkPermission(req)) {
            return res.status(403).json({success: false, message: error.api.NO_PERMISSION});
        }

        const category = req.body.category;
        const groupNumber = req.session.user.groupNumber;
        if (category === '') {
            return res.status(400).json({success: false, message: 'Category cannot be empty.'});
        }
        Category.findOne(
            {category: category, groupNumber: groupNumber},
            (err, category) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({success: false, message: err});
                }

                if (category) {
                    return res.status(400).json({
                        success: false,
                        message: 'Category ' + category.category + ' exists.'
                    });
                } else {
                    let newCategory = new Category({
                        id: req.body.id,
                        category: req.body.category,
                        description: req.body.description,
                        groupNumber: groupNumber
                    });
                    newCategory.save((err, updatedCategory) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        return res.json({
                            success: true,
                            message:
                                'Category ' +
                                updatedCategory.category +
                                ' added.'
                        });
                    });
                }
            }
        );
    },

    get_attributes: (req, res) => {
        const groupNumber = req.session.user.groupNumber;
        Attribute.find(
            {groupNumber: groupNumber},
            'attribute id description',
            (err, attributes) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({success: false, message: err});
                }
                return res.json({success: true, attributes: attributes});
            }
        );
    },

    get_similar_attributes: (req, res) => {
        const groupNumber = req.session.user.groupNumber;
        const regex = new RegExp(req.params.queryPartialAttribute, "i");
        const query = {attribute: regex, groupNumber: groupNumber};
        Attribute.find(
            query,
            (err, attributes) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({success: false, message: err});
                }
                const count = attributes.length;
                return res.json({success: true, count: count, attributes: attributes});
            }
        );
    },

    get_similar_categories: (req, res) => {
        const groupNumber = req.session.user.groupNumber;
        const regex = new RegExp(req.params.queryPartialCategory, "i");
        const query = {category: regex, groupNumber: groupNumber};
        Category.find(
            query,
            (err, categories) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({success: false, message: err});
                }
                const count = categories.length;
                return res.json({success: true, count: count, categories: categories});
            }
        );
    },

    get_categories: (req, res, next) => {
        const groupNumber = req.session.user.groupNumber;
        Category.find({groupNumber: groupNumber}, 'category id description', (err, categories) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({success: false, message: err});
                }
                return res.json({success: true, categories: categories});
            }
        );
    },

    get_one_attribute: (req, res) => {
        const groupNumber = req.session.user.groupNumber;
        const queryAttributeId = req.params.attributeId;
        Attribute.findOne(
            {id: queryAttributeId, groupNumber: groupNumber},
            'attribute id',
            (err, attribute) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({success: false, message: err});
                }
                if (!attribute) {
                    const msgString = queryAttributeId + 'does not exists.';
                    return res
                        .status(200)
                        .json({success: true, message: msgString});
                }
                return res.json({success: true, attribute: attribute});
            }
        );
    },

    get_one_category: (req, res) => {
        const groupNumber = req.session.user.groupNumber;
        const queryCategoryId = req.params.categoryId;
        Attribute.findOne(
            {id: queryCategoryId, groupNumber: groupNumber},
            'category id',
            (err, category) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({success: false, message: err});
                }
                if (!category) {
                    const msgString = queryCategoryId + 'does not exists.';
                    return res
                        .status(200)
                        .json({success: true, message: msgString});
                }
                return res.json({success: true, attribute: category});
            }
        );
    },

    user_edit_att: (req, res, next) => {
        if (!checkPermission(req)) {
            return res
                .status(403)
                .json({success: false, message: error.api.NO_PERMISSION});
        }

        const id = req.body.id;
        const attribute = req.body.attribute;
        const description = req.body.description;
        const groupNumber = req.session.user.groupNumber;
        if (attribute === '') {
            return res.status(400).json({
                success: false,
                message: 'Attribute cannot be empty.'
            });
        }
        Attribute.findOne(
            {attribute: attribute, groupNumber: groupNumber},
            (err, dbAttribute) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({success: false, message: err});
                }

                if (dbAttribute) {
                    dbAttribute.id = id;
                    dbAttribute.description = description;

                    dbAttribute.save((err, dbAttribute) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }

                        return res.json({
                            success: true,
                            message:
                                'Attribute ' +
                                dbAttribute.attribute +
                                ' updated.'
                        });
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: attribute + ' does not exist.'
                    });
                }
            }
        );
    },
    user_edit_cat: (req, res, next) => {
        if (!checkPermission(req)) {
            return res
                .status(403)
                .json({success: false, message: error.api.NO_PERMISSION});
        }

        const id = req.body.id;
        const category = req.body.category;
        const description = req.body.description;
        const groupNumber = req.session.user.groupNumber;
        if (category === '') {
            return res.status(400).json({
                success: false,
                message: 'Category cannot be empty.'
            });
        }
        Category.findOne(
            {category: category, groupNumber: groupNumber},
            (err, dbCategory) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({success: false, message: err});
                }

                if (dbCategory) {
                    dbCategory.id = id;
                    dbCategory.description = description;

                    dbCategory.save((err, dbCategory) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }

                        return res.json({
                            success: true,
                            message:
                                'Category ' +
                                dbCategory.category +
                                ' updated.'
                        });
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: category + ' does not exist.'
                    });
                }
            }
        );
    },

    user_delete_attribute: (req, res) => {
        if (
            !req.session.user.permissions.includes(config.permissions.ATTRIBUTE_CATEGORY_MANAGEMENT)
        ) {
            return res
                .status(403)
                .json({success: false, message: error.api.NO_PERMISSION});
        }
        const queryAttributeId = req.params.attributeId;

        // condition 1: this attribute exist
        Attribute.findOne({id: queryAttributeId}, (err, attribute) => {
            if (err) {
                return res.status(500).json({success: false, message: err});
            }

            if (!attribute) {
                const messageStr =
                    'Attribute(id: ' +
                    queryAttributeId +
                    ') ' +
                    'does not exist.';
                return res
                    .status(400).json({success: false, message: messageStr});
            }

            // condition 2: this attribute does not be used in workbook
            Workbook.find({}, (err, workbooks) => {
                if (err) {
                    return res.status(500).json({success: false, message: err});
                }

                if (workbooks) {
                    for (let i = 0; i < workbooks.length; i++) {
                        let attMap = workbooks[i].attMap;
                        for (let indexOfWorksheet in attMap) {
                            let worksheet = attMap[indexOfWorksheet];
                            for (var dbAttributeId in worksheet) {
                                if (dbAttributeId === queryAttributeId) {
                                    const messageStr =
                                        'Attribute(id:' +
                                        queryAttributeId +
                                        ') ' +
                                        'cannot be deleted, ' +
                                        workbooks[i].name +
                                        ' are using this attribute.';
                                    return res.status(400).json({
                                        success: false,
                                        message: messageStr
                                    });
                                }
                            }
                        }
                    }
                }
                // Delete attribute
                Attribute.deleteOne({_id: attribute._id}, function (err) {
                    if (err) {
                        return res.status(500).json({success: false, message: err});
                    } else {
                        const messageStr =
                            'Attribute(id:' +
                            queryAttributeId +
                            ') ' +
                            ' deleted.';
                        return res.json({success: true, message: messageStr});
                    }
                });
            });
        });
    },

    user_delete_category: (req, res) => {
        if (
            !req.session.user.permissions.includes(config.permissions.ATTRIBUTE_CATEGORY_MANAGEMENT)
        ) {
            return res.status(403).json({success: false, message: error.api.NO_PERMISSION});
        }
        const queryCategoryId = req.params.categoryId;

        // condition 1: this attribute exist
        Category.findOne({id: queryCategoryId}, (err, category) => {
            if (err) {
                return res.status(500).json({success: false, message: err});
            }

            if (!category) {
                const messageStr =
                    'Category(id: ' +
                    queryCategoryId +
                    ') ' +
                    'does not exist.';
                return res.status(400).json({success: false, message: messageStr});
            }

            // condition 2: this attribute does not be used in workbook
            Workbook.find({}, (err, workbooks) => {
                if (err) {
                    return res.status(500).json({success: false, message: err});
                }

                if (workbooks) {
                    for (let i = 0; i < workbooks.length; i++) {
                        let attMap = workbooks[i].attMap;
                        for (let indexOfWorksheet in attMap) {
                            let worksheet = attMap[indexOfWorksheet];
                            for (let dbAttributeId in worksheet) {
                                if (dbAttributeId === queryCategoryId) {
                                    const messageStr =
                                        'Category(id:' +
                                        queryCategoryId +
                                        ') ' +
                                        'cannot be deleted, ' +
                                        workbooks[i].name +
                                        ' are using this category.';
                                    return res.status(400).json({
                                        success: false,
                                        message: messageStr
                                    });
                                }
                            }
                        }
                    }
                }
                // Delete Category
                Category.deleteOne({_id: category._id}, function (err) {
                    if (err) {
                        return res.status(500).json({success: false, message: err});
                    } else {
                        const messageStr =
                            'Category(id:' +
                            queryCategoryId +
                            ') ' +
                            ' deleted.';
                        return res.json({success: true, message: messageStr});
                    }
                });
            });
        });
    }
};
