//instance of MobileServiceClient
var client = new WindowsAzure.MobileServiceClient("https://mydemodatabase.azure-mobile.net/","idEhIsnxJBaHPMkNYOLIlNFHGeDnUU92");

/**
*   Calls a simple Table API from mobile serices
*   
*/      
function getTableAPI() 
{
    var products = client.getTable('productapi');
    
    var query = products.select("name", "description")
    .read()
    .done(function (productItems) 
    {
        var items = $.map(productItems, function(item) 
        {
            return $('<tr>')
                .append($("<td></td>").text(item.name))
                .append($("<td></td>").text(item.description));
        });
        
        $('#product-table').empty()
        .append(items)
        .toggle(items.length > 0);
    }, 
    handleError);	

}
/**
*   Error handler
*   
*/  
function handleError(error) {
    var text = error + (error.request ? ' - ' + error.request.status : '');
    console.log(text);
}
/**
*   Calls a custom API from mobile serices
*   
*/  
function getCustomAPI(string) 
{
    client.invokeApi('getuserinfo', 
    {
        method: 'get'
    }
    )
    .done(function(results)
    {
        var obj = JSON.parse(results.responseText);
        $(".userimage").attr("src", obj.profile_image_url_https)
        $(".screenname").text(obj.screen_name);
        console.log(obj.screen_name);         
    }
    );
}
/**
*   Calls a login API from mobile serices
*   
*/  
function getLoginAPI() 
{
    client.login("twitter")
    .then(function (results) 
    {
        getCustomAPI(results.userId);  
        showPanel(".user-panel");        
    }
    );
}
/**
*   Sets up UI
*   
*/  
function hidePanel(panelName) 
{
    $(panelName).hide();
}
/**
*   Sets up UI
*   
*/  
function showPanel(panelName) 
{
    $(panelName).show();
}

/**
*   Sets up UI
*   
*/  
function start() 
{
    hidePanel(".user-panel");
    hidePanel(".search-panel");
}

//kick off!
start();