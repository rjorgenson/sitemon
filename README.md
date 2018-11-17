# sitemon

This is a basic script to monitor a URL for changes to a regex match.

Create a site.json file in the root directory(this file will be ignored by git) with the following structure.

```JSON
{
    "monitorShortname": {
        "name": "Name of monitor as you want it to appear in output",
        "uri": "<THE URL YOU WANT TO MONITOR>",
        "regex": "<THE REGEX YOU WANT TO MATCH>"
    }
}
```
Storing the regex in JSON creates some annoyance. It must be stores in a format that the regexp library in node can create a regex from, information regarding this can be found [here](https://makandracards.com/makandra/15879-javascript-how-to-generate-a-regular-expression-from-a-string)