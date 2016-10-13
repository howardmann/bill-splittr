// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require react
//= require react_ujs
//= require components
//= require_tree .


// Prevent mobile touch scroll on pages with the class element '.static'. Recreate native app UX
var checkStatic = function(){
  if ($('.static').length > 0) {
    console.log("on");
    $(document).on('touchmove',function(e){
      e.preventDefault();
    });
  } else {
    console.log("off");
    $(document).off('touchmove',function(e){
      e.preventDefault();
    });
  }
}

// ATM decimal solution attributed to Anders Holmström via jsfiddle http://jsfiddle.net/77bMx/86/
var input = ""; //holds current input as a string

var getKeyValue = function(keyCode) {
  if(keyCode > 57) { //also check for numpad keys
      keyCode -= 48;
  }
  if(keyCode >= 48 && keyCode <= 57) {
      return String.fromCharCode(keyCode);
  }
}

var formatNumber= function(input) {
  if(isNaN(parseFloat(input))) {
      return "0.00"; //if the input is invalid just set the value to 0.00
  }
  var num = parseFloat(input);
  return (num / 100).toFixed(2); //move the decimal up to places return a X.00 format
}

// JavaScript prevent empty input values of form submitting
var checkRequired = function(){
  console.log("check");
  var $inputArr = $('form').find('.required');
  for (let i = 0; i < $inputArr.length; i++){
    var inputVal = $inputArr.eq(0).val();
    if (inpuVal.length < 2) {
      return false;
    }
  }
  return true;
};

$(document).ready(function(){
  console.log("ready");

  // Prevent mobile scrolling on select pages
  checkStatic();

  // ATM decimal input solution
  $(".atm").keydown(function(e) {
    //handle backspace key
    if(e.keyCode == 8 && input.length > 0) {
      input = input.slice(0,input.length-1); //remove last digit
      $(this).val(formatNumber(input));
    }
    // Allow tab as key exception
    else if (e.keyCode == 9) {
      return true;
    }
    // Add digit to input string
    else {
      var key = getKeyValue(e.keyCode);
      if(key) {
          input += key; //add actual digit to the input string
          $(this).val(formatNumber(input)); //format input string and set the input box value to it
      }
    }
    // Prevent all other keys
    return false;
  });
});
