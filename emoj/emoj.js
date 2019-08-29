var fs = require('fs'),
    emoj = fs.readFileSync('index.js', 'utf-8');


var a1 = emoj.split('],')[0];
var a2 = emoj.split('],')[1];
var s1 = a1.split('file:[')[1];
var s2 = a2.split('text:[')[1];

var d1 = [];
var d2 = [];
for(var i=0;i<s1.split(',').length;i++){    //过滤 /n/r ,空格 , 双引号
  d1.push(s1.split(',')[i].replace(/[\r\n]/g, "").replace(/ /g,'').replace(/\"/g, ""));
}
for(var i=0;i<s2.split(',').length;i++){    //过滤 /n/r ,空格 , 双引号
  d2.push(s2.split(',')[i].replace(/[\r\n]/g, "").replace(/ /g,'').replace(/\"/g, ""));
}
console.log(d1);
console.log(d2);

var emoj = {};
for(var i=0;i<d1.length;i++){
  emoj[d2[i]] = d1[i];
}

// console.log(emoj);


fs.writeFileSync('out.js',JSON.stringify(emoj));
