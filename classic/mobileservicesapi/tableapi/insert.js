function insert(item, user, request) {

    var userTable = tables.getTable('UserProfile');
    console.log('searching for %s ', item.screen_name);
    
    userTable.where({ screen_name: item.screen_name })
        .read({
            success: function(results) {
                if (results.length > 0) {
                    //Need to error out
                    console.log('error out');
                    request.respond(statusCodes.CONFLICT, { message: 'Duplicate User'});
                } else {
                    //console.log('User %s not found.', request.screenName);
                    console.log('successfully created user');
                    request.execute();                    
                }
            }
        });

}