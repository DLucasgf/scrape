var express = require('express');
var sleep = require('sleep');
var url = require('url');
var fs = require('fs');
var csv = require('csvtojson');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log('scieloTmp');

  var arquivosCsv = new Array();
  var csvPath = 'scielocsv/full';
  var jsonResult = new Array();
/*
  var i = 0;
  while (i < 10) {

    //console.log('Why so serious? ' + i);
    //sleep.msleep(500);

    i++;
  }*/

  //var articleUrl = "http://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S2007-249X2016000200060&lang=pt";
  
  fs.readdir(csvPath, (err, files) => {
    files.forEach(file => {
      //console.log(file);

      csv()
        .fromFile(csvPath + '/' + file)
        .on('json', (jsonObj) => {
          //console.log('jsonObj');
          //console.log(jsonObj);
          //jsonResult.push(JSON.stringify(jsonObj));
          jsonResult.push(jsonObj);
          //console.log(jsonResult);
        })
        .on('done', (error) => {
          console.log('end');
          console.log(jsonResult);

          fs.writeFile('scielocsv/tmp/' + file + '.json', JSON.stringify(jsonResult, null, 4), function(err) {
            console.log('Arquivo ' + file + ' salvo');
          });
        });
    });
    //arquivosCsv = files;
  });

  arquivosCsv = fs.readdirSync('scielocsv/full');

  

  /*var tmp = url.parse(articleUrl, true);
  console.log('tmp');
  console.log(tmp);
  var pid = tmp.query.pid;
  console.log('pid');
  console.log(pid);*/

  console.log(arquivosCsv.length);

  res.render('index', { title: 'Express ' + arquivosCsv.length });
});

module.exports = router;
