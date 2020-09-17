const LanguagesList = require('../models/languages');

const express = require('express'),
    router = express.Router(),
    languages = require('../models/languages'),
    rankings = require('../models/rankings')
const renderPage = async res => {
    const langData = await languages.getAll();
    const rankData = await rankings.getAll();
    return res.render("template", {
        locals: {
            title: "Welcome",
            data_lang: langData,
            data_rank: rankData
        },
        partials: {
            partial: "partial-index"
        }
    });
}

router.get('/', async (req, res) =>{
    renderPage(res);
});
router.post('/', async (req, res) =>{
    for (let key in req.body){
        const dbResponse = await languages.updateStatus(req.body[key], key)
    }
    //res.redirect('/');
    renderPage(res);
});

module.exports = router;