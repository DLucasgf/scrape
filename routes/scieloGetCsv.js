var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var sleep = require('sleep');
var urlHandler = require('url');
var util = require('util');
var csv = require('csvtojson');

var libs = require('../js/libs');
var download = require('../js/download');

var router = express.Router();

/* GET scieloResults listing. */
router.get('/', function(req, res, next) {
  console.log('scieloGetCsv');

  var csvPath = 'scielocsv/export.csv';
  var fromCsvUrl = 'http://search.scielo.org/?q=informacao&lang=pt&count=50&from=201&output=xml&sort=&format=summary&fb=&page=5';

  var toCsvpath = 'scielocsv';
  var jsonResult = new Array();

  download(fromCsvUrl, toCsvpath)
    .then(function(id){
        console.log('Arquivo gravado com id %s', id);
    })
    .catch(function(err){
        console.log('Deu pau..');
        console.log(err.stack);
    });
/*
    for (var i = 0; i < array.length; i++) {
      var urlPath = 'http://search.scielo.org/?q=a+OR+b+OR+c+OR+d+OR+e+OR+f+OR+g+OR+h+OR+i+OR+j+OR+k+OR+l+OR+m+OR+n+OR+o+OR+p+OR+q+OR+r+OR+s+OR+t+OR+u+OR+v+OR+w+OR+x+OR+y+OR+z&' +
                    'lang=pt&count=50&' +
                    'from=0&output=csv&sort=&format=summary&fb=&page=1';
    }

*/
  res.send('Why so serious? csv2');



});

module.exports = router;
