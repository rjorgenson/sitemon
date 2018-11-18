## sitemon
This is a basic script to monitor a URL for changes to a regex match.

Create a monitors.json file in the root directory(this file will be ignored by git). Here is an example of the `monitors.json` file.

```JSON
{
    "monitorShortname": {
        "name": "Name of monitor as you want it to appear in output",
        "uri": "https://theurl.you/want/to/watch",
        "regex": "^a (regexp|regex) to \\w+ on the page with the value you want to watch in \\(\\)'s$",
        "method": "any",
        "curval": "The current value of what the regex matches, so we know when it changes",
    },
    "someOtherMonitorShortname": {
        "name": "Name of some other monitor as you want it to appear in output",
        "uri": "https://someotherurl.you/want/to/watch",
        "regex": "^a (regexp|regex) to \\w+ on the page with the value you want to watch in \\(\\)'s$",
        "method": "exact",
        "curval": "The current value of what the regex matches, so we know when it changes",
        "wantedval": "The value you want to watch for"
    }
}
```
Storing the regex in JSON creates some annoyance(as you can see in the example). It must be stored in a string that the regexp library in node can create a regex from, information regarding this can be found [here](https://makandracards.com/makandra/15879-javascript-how-to-generate-a-regular-expression-from-a-string)

This script was designed to be able to run from a cronjob and send an email when it notices a change from the value you have configured. You can add as many monitorShortName sections as you like, but keep in mind this has to load the page for each entry each time it runs.

## Monitor Object Properties
Properties marked with an * are required. An example of each proeprty is listed in each section. The example below would monitor for and alert when the item on the monitored page is out of stock.

##### `name*`
This is a descriptive name that will identify each monitor in the output.

`"name": "Item X in stock at store.com"`

##### `uri*`
This is the URI to fetch and check for changes.

`"uri": "https://store.com/category/item.htm`

##### `regex*`
This is the Regular Expression used to match the section of the page you want to monitor for changes. A match section(wrapped in parenthesis) is required in the regex.

`"regex": "In Stock: (\\d+|None)"`

##### `matchNumber`
This property is optional and will allow you to specify which match to use when checking for updates should more than one section on the page match your regex. This defaults to the first match.

`"matchNumber: "1"`

##### `method*`
The method to use when determining if the value has changed.

`"method": "Exact"`

##### `curval`
The current value that the is matched by the defined regex. This field is not required to be set, it will be populated the first time the script is ran. *note: if this property is ommited the script will trigger a change on the first run*

`"curval": "10"`

##### `wantedval`
This property is required for the `exact` and `contains` methods. This is the value you are wanting to monitor for.

`"wantedval": "None"`

## Methods

Supported methods are `any`, `number.gt`, `number.lt`, `exact`, and `contains`. Each is described below.

##### `any`
This method will trigger on any change from the `curval` defined in the object. The `curval` is updated in the obejct and written back to the `monitors.json` file every time it see's a change so you will only be alerted once for each change.

##### `number.gt`
This method will look for a number that is greater than the `curval` defined in the object. The `curval` is updated in the obejct and written back to the `monitors.json` file every time it see's a change so you will only be alerted once for each change.

##### `number.lt`
This method will look for a number that is lower than the `curval` defined in the object. The `curval` is updated in the obejct and written back to the `monitors.json` file every time it see's a change so you will only be alerted once for each change.

##### `exact`
This method will look for a value that matches `wantedval` as defined in the object. This check will only alert if the sotred `curval` is different than the `wantedval`. The `curval` is updated in the obejct and written back to the `monitors.json` file every time it see's a change so you will only be alerted once for each change.

##### `contains`
This method will look for the `wantedval` as defined in the object in the RegExp match. The `curval` is updated in the obejct and written back to the `monitors.json` file every time it see's a change so you will only be alerted once for each change.

## TODO
- ~~support regex's that match more than once on a page~~
- support monitoring more than one value on a single page without mulitple downloads
- ~~support different comparison methods~~
    - ~~strings~~
        - ~~contains~~
        - ~~exact value~~
        - ~~any change~~
    - ~~numbers~~
        - ~~less than~~
        - ~~greater than~~
        - ~~exact value~~
        - ~~any change~~
- build alerts into script over relying on cron
    - email
    - slack
    - others?
- ~~value tracking and writeback~~
