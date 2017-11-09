/**
 * Created by lenovo on 2017/11/3.
 */
(function () {
    var CONFIG = require('../config.json');
    var path = require('path');
    var fs = require('fs');
    var _ = require('lodash');

    function _readTxtbyDate(DateStr) {
        var FileInfo = [];
        var txtPath = CONFIG.txtFilePath;
        var txtName = "SA_" + DateStr + ".txt";
        var txtFullPath = path.resolve(txtPath, txtName);
        if (fs.existsSync(txtFullPath)) {
            FileInfo = _getTxtDataInfo(txtFullPath);
        }
        return FileInfo;
    }

    function _getTxtDataInfo(FileName) {

        var FileInfo = fs.readFileSync(FileName);

        var FileInfosp = FileInfo.toString().split('\n');

        var locationList = [];

        if (FileInfosp.length > 2) {
            for (var i = 3; i < FileInfosp.length - 1; i++) {
                var location = {};
                var locationItem = FileInfosp[i];
                var locationItemsp = locationItem.split(' ');
                locationItemsp = _trimArray(locationItemsp);

                location.time = locationItemsp[0];
                location.target = _getTarPos(locationItemsp);
                location.sun = _getSunPos(locationItemsp);
                location.moon = _getMoonPos(locationItemsp);
                if (i % 5 % 60 == 0) {
                    locationList.push(location);
                }

            }
        }

        return locationList;
        /* var writeFileName = path.resolve('../data', 'SA_2014-12-10.json');
         fs.writeFileSync(writeFileName, JSON.stringify(locationList));*/
    }

    function _trimArray(locationItemsp) {
        var itemList = [];
        for (var i = 0; i < locationItemsp.length; i++) {
            var item = _.trim(locationItemsp[i], " ");
            if (item !== "") {
                itemList.push(item);
            }
        }
        return itemList;
    }

    function _getTarPos(locationItem) {
        var x = locationItem[1];
        var y = locationItem[2];
        var z = locationItem[3];
        var uv = _getUVFunc(x, y, z);
        return {
            "x": x, "y": y, "z": z, "uv": uv
        };
    }

    function _getSunPos(locationItem) {
        var x = locationItem[4];
        var y = locationItem[5];
        var z = locationItem[6];
        var uv = _getUVFunc(x, y, z);
        return {
            "x": x, "y": y, "z": z, "uv": uv
        };
    }

    function _getMoonPos(locationItem) {
        var x = locationItem[7];
        var y = locationItem[8];
        var z = locationItem[9];
        var uv = _getUVFunc(x, y, z);
        return {
            "x": x, "y": y, "z": z, "uv": uv
        };
    }

    function _getUVFunc(x, y, z) {
        var r = Math.sqrt(x * x + y * y + z * z);
        var V = Math.asin(z / r) / Math.PI;
        var U = Math.atan(y / x) / 2 / Math.PI;
        //   console.log("r:" + r + "  v:" + V + "  u:" + U);
        return [y, z];
    }

    exports.readTxtbyDate = _readTxtbyDate;
})();
