var request = require('request');

function QueryProduct(userId,product)
{
   return Promise.all([MercadoLibreSearch(product), AmazonSearch(product), WalMartSearch(product)]);
}

function AmazonSearch(product)
{
    var productName = product;
    var price = "20.00";
    var store = "Amazon"
    return {ProductName:productName,Price:price,Store:store}
}

function MercadoLibreSearch(product)
{
    return new Promise((resolve, reject) => {
         request('https://api.mercadolibre.com/sites/MLM/search?q='+product+'&sort=price_desc&limit=1', function (error, response, body) {
            if(error) reject({status:"Error",error:error});

            body = JSON.parse(body);
            if(body.results.length > 0)
                resolve( {ProductName:body.results[0].title,Price:body.results[0].price,Store:"Mercado libre"});
            else reject({status:"Error",error:"producto no encontrado"});
        });
    });
}

function WalMartSearch(product)
{
    var productName = product;
    var price = "25.00";
    var store = "Wal Mart"
    return {ProductName:productName,Price:price,Store:store}
}

exports.QueryProduct = QueryProduct