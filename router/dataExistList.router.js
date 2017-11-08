/**
 * Created by lenovo on 2017/11/2.
 */
var express = require('express');
var router = express.Router();
var path = require('path');

/*主界面*/
router.get('/api/locationInfo/:date', function (req, res, next) {
    var DateStr = req.params.date;
    console.log("DateStr:" + DateStr);
    res.end("11111");

    //next();
});


module.exports = router;