var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var sleep = require('sleep');
var urlHandler = require('url');
var util = require('util');
var csv = require('csvtojson');

var libs = require('../js/libs');

var router = express.Router();

/* GET scieloResults listing. */
router.get('/', function(req, res, next) {
  console.log('scieloCsv');

  var csvPath = 'scielocsv/export.csv';
  var jsonResult = new Array();

  csv()
  .fromFile(csvPath)
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

    fs.writeFile('scielocsv/json/output.json', JSON.stringify(jsonResult, null, 4), function(err) {
      console.log('Arquivo salvo');
    })


  });
  /*
  console.log('jsonResult ******************************************************');
  console.log(jsonResult);
  */




  /*var csvOr = libs.scieloCsv()
  console.log('csv original');
  console.log(csvOr);

  /*var csvMod = csvOr.split('","').map(e => ({
    "id" : e[0],
    "title" : e[1]
  }));*
  var splitado = csvOr.split('\n');
  console.log('splitado');
  console.log(splitado);
  var csvMod = [];
  for (var i = 0; i < splitado.length; i++) {
    //csvOr.split([i]

    csvMod.push(splitado[i].split(',').map(function(item, index) {
      //console.log('item');
      //console.log(item);
      return {
        "id" : item[0],
        "title" : item[index]
      };
    }));
  }
  console.log('csv mod');
  console.log(csvMod);*/

  res.send('Why so serious? csv2');



});

module.exports = router;
