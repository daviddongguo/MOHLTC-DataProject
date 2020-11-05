const express = require('express');
let router = express.Router();
const Attribute = require('../models/workbook/attribute');
const Category = require('../models/workbook/category');
AttributeGroup = require('../models/workbook/attributeGroup');
CategoryGroup = require('../models/workbook/categoryGroup');


router.get('/debug/test', (req, res) => {
    return res.json({success: true, message: 'Hi, there!'});
});

router.get('/debug/CategoryGroups', async (req, res, next) => {
    const categoryGroupName = req.query.categoryGroupName;
    const categoryGroupParentId = req.query.categoryGroupParentId;
    let query = {};
    if (categoryGroupName) {
        query = {name: categoryGroupName};
    }
    if (categoryGroupParentId) {
        query = {parent: categoryGroupParentId};
    }
    try {
        const documents = await CategoryGroup.find(query);
        res.json({success: true, documents})
    } catch (e) {
        next(e);
    }
});

router.post('/debug/CategoryGroups', async (req, res, next) => {
    const groupNumber = 1;
    const name = req.body.categoryGroupName;
    if(!name){
        return res.status(400).json({success: false, message: 'no name'});
    }
    const dbCategoryGroup = await CategoryGroup.findOne({name});
    if (dbCategoryGroup) {
        return res.status(200).json({success: false, message: `CategoryGroup (${name}) existed.`, document: dbCategoryGroup});
    }
    try {
        const newCategoryGroup = new CategoryGroup({name, groupNumber});
        await newCategoryGroup.save();
        return res.json({success: true, message: `CategoryGroup (${name}) saved.`, document: newCategoryGroup});
    } catch (e) {
        // console.log(e);
        next(e);
    }
});

router.put('/debug/CategoryGroups/:id', async (req, res, next) => {
    // child
    const _id = req.params.id;
    const parentId = req.body.parentId;
    if(_id === parentId){
        return res.status(400).json({success: false, message: `patent can not be the child of itself.`});
    }

    const dbCategoryGroup = await CategoryGroup.findOne({_id});
    if (!dbCategoryGroup) {
        return res.status(400).json({success: false, message: `CategoryGroup (${_id}) doesn't exist.`});
    }


    const dbParentCategoryGroup = await CategoryGroup.findOne({_id: parentId});
    // parent
    if (!dbParentCategoryGroup) {
        return res.status(400).json({success: false, message: `CategoryGroup (${_id}) doesn't exist.`});
    }else{
        if(dbParentCategoryGroup._id === dbCategoryGroup._id){
            return res.status(400).json({success: false, message: `patent can not be the child of itself.`});
        }
    }

    try {
        // child
        dbCategoryGroup.parent = dbParentCategoryGroup._id;
        // parent
        dbParentCategoryGroup.children.push(dbCategoryGroup._id);

        // FIXME:
        await dbCategoryGroup.save();
        await dbParentCategoryGroup.save();

        return res.json({success: true, document: dbCategoryGroup});
    } catch (e) {
        // console.log(e);
        next(e);
    }
});




router.get('/debug/deletecategory', async (req, res) => {
    await Category.deleteMany({});
    return res.json({success: false, message: 'success'});
});
router.get('/debug/deleteattributeand', async (req, res) => {
    await Attribute.deleteMany({});
    return res.json({success: false, message: 'success'});
});
router.get('/debug/deleteattributeandcategory', async (req, res) => {
    await Attribute.deleteMany({});
    await Category.deleteMany({});
    return res.json({success: false, message: 'success'});
});

router.get('/debug/deletegroup', async (req, res) => {
    await AttributeGroup.deleteMany({});
    await CategoryGroup.deleteMany({});
    return res.json({success: true, message: 'success'});
});
router.get('/debug/generateAttributeGroups', async (req, res) => {
    try {
        const attributes = await Attribute.find({});
        const distinctAttributes = [
            ...new Set(attributes.map(x => x.attribute))
        ];
        let groups = [];
        for (let i = 0; i < distinctAttributes.length; i++) {
            const attributeIds = [];
            for (let j = 0; j < attributes.length; j++) {
                if (attributes[j].attribute === distinctAttributes[i]) {
                    attributeIds.push(attributes[j].id);
                }
            }
            groups.push(
                new AttributeGroup({
                    name: distinctAttributes[i],
                    groupNumber: 1,
                    attributeIds
                })
            );
        }
        await AttributeGroup.insertMany(groups, function (err, docs) {
            let message = '';
            if (err) {
                message = err.errmsg;
                return res.status(500).json({success: false, message: message});
            }
            message = docs.length + ' attributes added.';
        });

        //
        const categories = await Category.find({});
        const distinctCategoryies = [
            ...new Set(categories.map(x => x.category))
        ];

        groups = [];
        for (
            let indexOfDistinctCat = 0;
            indexOfDistinctCat < distinctCategoryies.length;
            indexOfDistinctCat++
        ) {
            const ids = [];
            for (let j = 0; j < categories.length; j++) {
                if (
                    categories[j].category ===
                    distinctCategoryies[indexOfDistinctCat]
                ) {
                    ids.push(categories[j].id);
                }
            }
            groups.push(
                new CategoryGroup({
                    name: distinctCategoryies[indexOfDistinctCat],
                    groupNumber: 1,
                    categoryIds: ids
                })
            );
        }

        await CategoryGroup.insertMany(groups, function (err, docs) {
            let message = '';
            if (err) {
                message = err.errmsg;
                return res.status(500).json({success: false, message: message});
            }
            message = docs.length + ' attributes added.';
        });
        return res.json({success: true});
    } catch (err) {
        console.log(err);
    }
});

router.get('/debug/attributeGroups', async (req, res) => {
    try {
        const attributeGroups = await AttributeGroup.find({});
        if (!attributeGroups) {
            return res.json({success: false});
        }
        const results = [];
        attributeGroups.forEach(element => {
            var arr = [element.id, element.name];
            results.push(arr);
        });

        return res.json(results);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
