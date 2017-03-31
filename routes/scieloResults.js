var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var sleep = require('sleep');
var urlHandler = require('url');
var util = require('util');

var libs = require('../js/libs');

var router = express.Router();

/* GET scieloResults listing. */
router.get('/', function(req, res, next) {
  console.log('scieloResults');

  //url = 'http://search.scielo.org/?q=informacacao&where=ORG';
  url = 'http://www.google.com';
  var nameFile = '';

  request(url, function(error, response, html) {
    console.log('Início');
    if(!error) {
      console.log('If');
      //var $ = cheerio.load(html);
      var $ = cheerio.load(libs.scieloListResults());
      console.log('Pos if');
      //console.log(libs.scieloListResults());

      var title,
          release,
          rating,
          articleUrl,
          articleId,
          authors = [],
          journal;
      var json;

      $('.results').filter(function( index, element ) {
        var data = $(this);
        console.log('results');

        json = {
          articleUrl  : "",
          articleId   : "",
          title       : "",
          authors     : [],
          journal     : ""
        };

        var resultsArr = data.children();

        /*for (var i = 0; i < resultsArr.length; i++) {
          title = resultsArr[i]
          console.log(resultsArr[i]);
        }*/

        articleId = resultsArr[0].attribs['id'];
        articleUrl = resultsArr[0].children[3].children[3].children[3].attribs['href'];
        title = resultsArr[0].children[3].children[3].children[3].attribs['title'];



        base = element;

        articleUrl = element.children[0].next.children[1].next.next.children[2].next.children[3].attribs['href'];
        //title = element.children[0].next.children[1].next.next.children[2].next.children[3].attribs['title'];
        //title = data.children();
        //journal = element.children[0].next.children[1].next.next.children[12].next.children[0].next.children[0].children[0].data;


        var authorsResult = element.children[0].next.children[1].next.next.children[9].children;
        for(var x in authorsResult) {
          if(typeof authorsResult[x].attribs !== 'undefined') {
            authors.push(authorsResult[x].children[0].data);
            //console.log(authorsResult[x].children[0].data);
          }
        }

        console.log('objeto');
        //console.log(element);

        console.log('array lenght');
        console.log(data.children().length);

        console.log('id ******************************************************');
        console.log(articleId);

        console.log('name ******************************************************');
        console.log(title);

        json.articleUrl = articleUrl;
        json.articleId = articleId;
        json.title = 'title';
        json.authors = authors;
        json.journal = 'journal';

        nameFile = 'title';
        nameFile = nameFile.replace(/[^a-zA-Z\s]/g,"").replace(/[\s]/g,"-");

        var urlParams = urlHandler.parse(articleUrl, true);
        //console.log('urlParams');
        //console.log(urlParams);
        var pid = urlParams.query.pid;
        //console.log('pid');
        //console.log(pid);

        nameFile = pid;

        //console.log(util.inspect(element, {showHidden: true, depth: 3}));

        fs.writeFile('out/scielo/data_' + nameFile + '.json', JSON.stringify(util.inspect(data.children(), {showHidden: true, depth: 3}), null, 4), function(err) {
          console.log('Arquivo ' + nameFile + ' salvo');
        })

        fs.writeFile('out/scielo/output_' + nameFile + '.json', JSON.stringify(json, null, 4), function(err) {
          console.log('Arquivo ' + nameFile + ' salvo');
        })

      })

      //console.log('start sleep');
      //sleep.msleep(1000);
      //console.log('end sleep');

      res.send('Why so serious? ' + articleId + ' v2');

    }
    else {
      console.log('else');
      res.send('Fail');
    }
  })


});

module.exports = router;
