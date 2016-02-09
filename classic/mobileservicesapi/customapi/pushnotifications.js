// See documentation at http://go.microsoft.com/fwlink/?LinkId=296704&clcid=0x409
exports.post = function (request, response) {
    response.send(statusCodes.OK);

    // The following call is for illustration purpose only
    // The call and function body should be moved to a script in your app
    // where you want to send a notification
    sendNotifications(request);
};


function sendNotifications(request) {
    var payload = '<?xml version="1.0" encoding="utf-8"?><toast><visual><binding template="ToastText01">' +
        '<text id="1">' + request.body.toast + '</text></binding></visual></toast>';
    var push = request.service.push;
    push.wns.send(null,
        payload,
        'wns/toast', {
            success: function (pushResponse) {
                console.log("Sent push:", pushResponse);
            }
        });
}