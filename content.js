/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Jinhua Wang
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions
 * of the Software.
 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

//establish a long-lived connection with the extension
var port = chrome.extension.connect({
      name: "switch"
 });
 port.onMessage.addListener(function(msg) {
      console.log("message recieved" + msg);
 });

//switch
jQuery(document).ready(function($){
    jQuery('#check_input').change(function(){
    	if(jQuery('#check_input').is(":checked")==true){
    		 port.postMessage("on");
    		 saveSettings("on");
    	} else {
    		port.postMessage("off");
    		saveSettings("off");
    	}
    });
    //setup the a tag jump
    jQuery('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
});

//save the switch settings in the database
function saveSettings(msg){
	chrome.storage.sync.set({'msg': msg}, function() {
      // Notify that we saved.
      console.log('Settings saved');
    });
}

//initialize user settings 
function init(){
	console.log("init");
	chrome.storage.sync.get("msg", function (obj) {
    	console.log(obj.msg);
    	if(obj.msg=="on"){
    		jQuery("#check_input").attr("checked",true);
    	}
	});
}

//init the switch
init();