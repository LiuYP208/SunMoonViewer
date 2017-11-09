/**
 * Created by lenovo on 2017/11/2.
 */

(function () {
    var express = require('express');
    var router = express.Router();
    var path = require('path');
    var getDataFunc = require("../module/getDataInfoByDate.js");

    /*主界面*/
    router.get('/api/locationInfo/:date', function (req, res, next) {
        var DateStr = req.params.date;
        console.log("DateStr:" + DateStr);

        var FileInfoJson = getDataFunc.readTxtbyDate(DateStr);
        res.end(JSON.stringify(FileInfoJson));
        //next();
    });


    module.exports = router;
})();