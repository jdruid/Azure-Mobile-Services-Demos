/**
*   This is a example of how to get a table within a custom api and perform a filter based on parameters passed in
*   
*           @param request - the request object is the "body.param name"
*/ 

exports.post = function(request, response) {
        // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;

    var userTable = request.service.tables.getTable('UserProfile');
    
    userTable.where({ screen_name: request.body.screenName, online: true})
        .read({
            success: function(results) {
                if (results.length > 0) {
                    request.respond(statusCodes.OK, { data: results});
                } else {
                    //console.log('User %s not found.', request.screenName);
                    request.respond(statusCodes.NO_CONTENT, { message: 'User not found'});
                }
            }
        });
    
};
