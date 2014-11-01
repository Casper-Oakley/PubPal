var host = location.origin.replace(/^http/,'ws');
var socket = io.connect(host, {secure: true});
window.onload = function(){
}
