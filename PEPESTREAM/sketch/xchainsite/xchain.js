function getDisplayAddress(address,full){var html='',full=(full)?true:false,arr=address.split('_');if(arr.length>1){html='<a href="/address/'+address+'">Multisig Address</a> ('+arr[0]+'-of-'+arr[arr.length-1]+')';if(full){arr.forEach(function(addr,idx){if(idx>0&&idx<(arr.length-1)){html+='<br/><a href="/address/'+addr+'">'+addr+'</a>';}});}}else{html+='<a href="/address/'+address+'">'+address+'</a>';}
return html;}
function getValidUrl(url){var re1=/^http:\/\//,re2=/^https:\/\//;if(!(re1.test(url)||re2.test(url)))
url='http://'+url;return url;}
function hex2string(hexx){var hex=hexx.toString();var str='';for(var i=0;(i<hex.length&&hex.substr(i,2)!=='00');i+=2)
str+=String.fromCharCode(parseInt(hex.substr(i,2),16));return str;}