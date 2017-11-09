/**
 * Created by lenovo on 2017/11/3.
 */
var z = 0;
var x = 0;
var y = 0;
var path = require('path');

var fs = require('fs');
var _ = require('lodash');


function _GetTxtDataInfo() {
    var FileName = path.resolve('../data', 'SA_2014-12-10.txt');
    var FileInfo = fs.readFileSync(FileName);
    console.log(FileInfo);
    var FileInfosp = FileInfo.toString().split('\n');
    var locationList = [];
    console.log(FileInfosp);
    if (FileInfosp.length > 2) {
        for (var i = 3; i < FileInfosp.length - 1; i++) {
            var location = {};
            var locationItem = FileInfosp[i];
            var locationItemsp = locationItem.split(' ');
            locationItemsp = _trimArray(locationItemsp);
            console.log(locationItemsp);
            location.time = locationItemsp[0];
            location.target = _getTarPos(locationItemsp);
            location.sun = _getSunPos(locationItemsp);
            location.moon = _getMoonPos(locationItemsp);
            if (i % 5 % 60 == 0) {
                locationList.push(location);
            }

        }
    }


    var writeFileName = path.resolve('../data', 'SA_2014-12-10.json');
    fs.writeFileSync(writeFileName, JSON.stringify(locationList));
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
    console.log("r:" + r + "  v:" + V + "  u:" + U);
    return [y, z];

}

_GetTxtDataInfo();
_getUVFunc(10, 0, 10);
