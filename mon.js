#!/usr/bin/env node
var rp = require('request-promise-native');

var monitors = require("./sites.json")

for(var mon in monitors) {
    rp({ uri: monitors[mon].uri, method: "GET", resolveWithFullResponse: true, "mon": monitors[mon] })
    .then(function(res) {
        var regex = new RegExp(res.request.mon.regex)
        var match = res.body.match(regex)
        if (match[1] != res.request.mon.curval) {
            console.log(res.request.mon.name+":", match[1])
        }
    })
}