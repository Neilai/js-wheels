var parse_url = /^(?<schema>[A-Za-z]+):?(\/{0,3})(?<host>[0-9.\-A-Za-z]+):(?<port>\d+)\/(?<path>[^?#]*)\?(?<query>[^#]*)(?<hash>#(.*))$/;
var parse_schema=/^(<schemaj>\w+)(?=:)/
var url = "https://harttle.land:80/tags.html?simple=true&fuck=1#HTML",
result =parse_schema.exec(url);
console.log(result);
