/**
*   This is a that will explain how to perform a SQL query against the tables in the DB.
*   
*           @param request - the request object is the "body param name"
*/  


exports.post = function(request, response) {
     // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;

    var mssql = request.service.mssql;

    var sql = "SELECT hr.hrreading FROM HeartRate AS hr JOIN UserProfile AS up ON hr.userprofile_id = up.id WHERE up.screen_name = ?";
    mssql.query(sql, request.body.screenName, {
        success: function(results) {
            if (results.length > 0) {
                // Permission record was found. Continue normal execution. 
                request.execute();
            } else {
                console.log('User %s attempted to submit an order without permissions.');
                request.respond(statusCodes.FORBIDDEN, 'You do not have permission to submit orders.');
            }
        },
        error: function(err) {
           console.log("error is: " + err);
        }
    });
    
}