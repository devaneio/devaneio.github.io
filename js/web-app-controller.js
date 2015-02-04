(function() {
  'use strict';
  var app;

  app = angular.module('devaneioApp', []);

  app.controller('mainController', function($scope) {
    return true;
  });

  window.app = app;

}).call(this);
