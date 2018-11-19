#!/usr/bin/env node

// load needed modules
var rp = require('request-promise-native');
var fs = require('fs');

// load list of monitors
var monitorsFile = __dirname + "/monitors.json"
var monitors = require(monitorsFile);

// loop through monitors and check their status
for(var mon in monitors) {
    rp({ uri: monitors[mon].uri, method: "GET", resolveWithFullResponse: true, "mon": mon, "monData": monitors[mon] })
    .then(function(res) {
        var data = res.request.monData;
        var mon = res.request.mon;
        (data.matchNumber) ? matchNumber = parseInt(data.matchNumber) : matchNumber = 1;
        var regex = new RegExp(data.regex);
        var match = res.body.match(regex);
        var updated = null;
        // check current value against stored value via defined method
        switch(data.method) {
            case "any":
                if (match[matchNumber] != data.curval) updated = true;
                break;
            case "number.gt":
                if (parseFloat(match[matchNumber]) > parseFloat(data.curval)) updated = true;
                break;
            case "number.lt":
                if (parseFloat(match[matchNumber]) < parseFloat(data.curval)) updated = true;
                break;
            case "exact":
                // break if we don't have a wantedval set
                if (!data.wantedval) console.log(mon+":", "Please confgiured a wantedval to use the exact method"); break;
                // break if we already have the value we want
                if (data.wantedval == data.curval) break;
                if (match[matchNumber] == data.wantedval) updated = true;
                break;
            case "contains":
                // break if we don't have a wantedval set
                if (!data.wantedval) console.log(mon+":", "Please confgiured a wantedval to use the contains method"); break;
                // break if the curval already contains the wantedval
                if (data.curval.indexOf(data.wantedval) != -1) break;
                if (match[matchNumber].indexOf(data.wantedval) != -1) updated = true;
                break;
            default:
                console.log(mon+":", "The method", data.method, "is not supported.");
        }
        // if value has changed notify and writeback new value
        if (updated) {
            // output new value with metadata
            console.log(res.request.monData.name+":", match[1], "-", res.request.monData.uri);
            // write new value back to monitors.json
            monitors[mon].curval = match[matchNumber];
            fs.writeFile(monitorsFile, JSON.stringify(monitors, null, 2), function (err) {
                if (err) return console.log(err)
            });
        }
    });
}
