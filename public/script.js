const url = 'https://newsapi.org/v2/everything?';
const apikey = "396048840e5b47309317bff78f3bcbfe";

$('button#Search').on('click', function (e) {
	Delete();
	
    var search = $('input#Text').val();
    var lang = $('select#selectLang option:selected').val();
    var sortBy = $('select#selectSortBy option:selected').val();
    var from = $('input#DateFrom').val();
    var to = $('input#DateTo').val();

    var newUrl = url +
        'q=' + search +
        '&from=' + from +
        '&to=' + to +
        '&language=' + lang +
        '&sortBy=' + sortBy +
        '&apiKey=' + apikey;

    var request = new XMLHttpRequest();
    console.log(newUrl);

    request.open('GET', newUrl);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        var result = request.response;
        console.log(result);
        
        if (result['status'] == 'ok') {
            for (i = 0; i < result['articles'].length; i++) {
                Add(result['articles'][i]['author'],
                    result['articles'][i]['title'],
                    result['articles'][i]['description'],
                    result['articles'][i]['url'],
                    result['articles'][i]['urlToImage'],
                    result['articles'][i]['publishedAt']
                );
            }
        }
        else {
            alert('Code: ' + result.code + '\nMessange: ' + result.message);
        }
    }

    e.stopPropagation();
});

function Add(author, title, description, url, urlToImage, publishedAt) {
    var otvet = $(
        '<div class="blog-post  wow fadeInUp">' +
        '<img class="img-responsive" src="' + urlToImage + '">' +
        '<h1>' + title + '</h1>' +
        '<span class="author">' + author + '</span>' +
        '<span class="date-time">' + publishedAt + '</span>' +
        '<p>' + description + '</p>' +
        '<a href="' + url + '" class="btn btn-upper btn-primary read-more">читать</a>' +
        '</div>'
    );
    $('div.Result').append(otvet);
}

function Delete(){
    $('div.blog-post').remove();
}