console.log('script-js  ON');
var $book = $('.book');
var bookResult = [];
var bData;
//handlebars2
// var source2 = $('#display-template2').html();
// var template2 = Handlebars.compile(source);
// var newHTML2 = template(bookResult);
//handlebars
var source = $('#display-template').html();
var template = Handlebars.compile(source);
var newHTML = template(bookResult);

var fetch = function($serchData) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + $serchData + 'isbn:',
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + $serchData + 'intitle:',
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + $serchData + ' subject:',
        success: function(data) {


            findBook(data, $serchData);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

function findBook(data, $serchData) {
    console.log(data);
    console.log($serchData);

    for (let i = 0; i < data.items.length; i++) {

        if (data.items[i].volumeInfo.title) {
            console.log('books colection found')
            renderResultList(data, i);
        } else if (data.items[i].volumeInfo.description) {
            console.log('books colection found')
            renderResultList(data, i);
        } else if (data.items[i].volumeInfo.industryIdentifiers[1].identifier == $serchData) {
            console.log('books colection found')
            return renderResultList(data, i);
        } else {
            // newHTML = { title: 'Book Not Found' }
            // $book.append(`<h1>` + newHTML.title + `</h1>`);
            console.log('serch dont match ')
        }
    }
}

$('.search-book').on('click', function() {
    var $serchData = $('.form-control').val();
    // console.log($serchData);
    fetch($serchData);
})

$('.book').on('click', '.bookTitle', function() {

    var clickedBookisbn = $(this).attr("data-isbn");
    console.log(clickedBookisbn)
    $(document).ready(function() {
        $("p,h3,img ").toggle(this);
    });
})

// render title only 
function renderResultList(data, i) {

    // creat an OBJ to append with handlebars
    let title = data.items[i].volumeInfo.title;
    let isbn = data.items[i].volumeInfo.industryIdentifiers[0].identifier;
    let authors = data.items[i].volumeInfo.authors;
    let description = data.items[i].volumeInfo.description;
    let img = data.items[i].volumeInfo.imageLinks.smallThumbnail;
    let obj = {
        book: [{
            title: title,
            isbn: isbn,
            authors: authors,
            description: description,
            img: img,
        }, ]
    }
    bookResult.push(obj)

    if (jQuery.inArray(bookResult[i].book[i], bookResult) !== -1) {
        bookResult.push(obj)
    }
    for (let z = 0; z < bookResult[i].book.length; z++) {
        var newHTML = template(bookResult[i].book[z]);

        $book.append(newHTML);
    }
}