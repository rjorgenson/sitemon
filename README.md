# sitemon

This is a basic script to monitor a URL for changes to a regex match.

Create a site.json file in the root directory(this file will be ignored by git) with the following structure.

```JSON
{
    "monitorShortname": {
        "name": "Name of monitor as you want it to appear in output",
        "uri": "https://theurl.you/want/to/watch",
        "regex": "^a (regexp|regex) to \\w+ on the page with the value you want to watch in \\(\\)'s$"
    }
}
```
Storing the regex in JSON creates some annoyance(as you can see in the example). It must be stored in a string that the regexp library in node can create a regex from, information regarding this can be found [here](https://makandracards.com/makandra/15879-javascript-how-to-generate-a-regular-expression-from-a-string)

# TODO
- support monitoring more than one value
