#!/usr/bin/env node

// load needed modules
var rp = require('request-promise-native');
var fs = require('fs');

// load list of monitors
var monitors = require("./monitors.json");

// loop through monitors and check their status
for(var mon in monitors) {
    rp({ uri: monitors[mon].uri, method: "GET", resolveWithFullResponse: true, "mon": mon, "monData": monitors[mon] })
    .then(function(res) {
        var data = res.request.monData
        var mon = res.request.mon
        var regex = new RegExp(data.regex);
        var match = res.body.match(regex);
        if (match[1] != data.curval) {
            // output new value with metadata
            console.log(res.request.monData.name+":", match[1], "-", res.request.monData.uri);
            // write new value back to monitors.json
            monitors[mon].curval = match[1];
            fs.writeFile('./monitors.json', JSON.stringify(monitors, null, 2), function (err) {
                if (err) return console.log(err)
            });
        }
    });
}