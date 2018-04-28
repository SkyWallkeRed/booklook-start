console.log('script-js  ON');
var $book = $('.book');
var bookResult = [];
var bData;
var source = $('#display-template').html();
var template = Handlebars.compile(source);
var newHTML = template(bookResult);
var $headerLogo = $('.lookBookHeader');

$headerLogo.on('click', function() {
    $book.empty();
    bookResult = [];
});
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
    $book.empty();
    bookResult = [];
    for (let i = 0; i < data.items.length; i++) {
        true ?
            renderResultList(data, i) :
            console.log('serch NOT found ')
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
    var clickedBook = $('[data-isbn =' + clickedBookisbn + ']');
    $(document).ready(function() {
        $("p,h3,img ").toggle(this); //the 'this' maks a strange transition in DOM ?? ask ..
    });
})

function renderResultList(data, i) {
    let obj = {
        book: [{
            title: data.items[i].volumeInfo.title,
            isbn: data.items[i].volumeInfo.industryIdentifiers[0].identifier,
            authors: data.items[i].volumeInfo.authors,
            description: data.items[i].volumeInfo.description,
            img: data.items[i].volumeInfo.imageLinks.smallThumbnail,
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



//###################################################################################

// console.log('script-js  ON');
// var $book = $('.book');
// var bookResult = [];
// var bData;
// var source = $('#display-template').html();
// var template = Handlebars.compile(source);
// var newHTML = template(bookResult);

// var fetch = function($serchData) {
//     $.ajax({
//         method: "GET",
//         url: 'https://www.googleapis.com/books/v1/volumes?q=' + $serchData + 'isbn:',
//         url: 'https://www.googleapis.com/books/v1/volumes?q=' + $serchData + 'intitle:',
//         url: 'https://www.googleapis.com/books/v1/volumes?q=' + $serchData + ' subject:',
//         success: function(data) {
//             findBook(data, $serchData);
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//             console.log(textStatus);
//         }
//     });
// };

// function findBook(data, $serchData) {
//     $book.empty();
//     console.log($serchData);
//     for (let i = 0; i < data.items.length; i++) {
//         (true) ?
//         renderResultList(data, i)
//             // book not found massege
//             :
//             console.log('serch dont match ') // serch for 'dasdasfsfgasdasfdAS' brings an eror
//     }
// }

// $('.search-book').on('click', function() {
//     var $serchData = $('.form-control').val();
//     fetch($serchData);
// })

// $('.book').on('click', '.bookTitle', function() {

//     var clickedBookisbn = $(this).attr("data-isbn");
//     console.log('Clicked book ISBN: ' + clickedBookisbn)
//     var clickedBook = $('[data-isbn =' + clickedBookisbn + ']');
//     // NEED TO FIX TOGGLE TO A SACIFIC BOOK AND LOAD WITH 'TOGGLE - HIDE ' 
//     $(document).ready(function() {
//         $("p,h3,img ").toggle(this); //the 'this' maks a strange transition in DOM ?? ask ..

//     });
// })

// function renderResultList(data, i) {
//     let obj = {
//         book: [{
//             title: data.items[i].volumeInfo.title,
//             isbn: data.items[i].volumeInfo.industryIdentifiers[0].identifier,
//             authors: data.items[i].volumeInfo.authors,
//             description: data.items[i].volumeInfo.description,
//             img: data.items[i].volumeInfo.imageLinks.smallThumbnail,
//         }, ]
//     }
//     bookResult.push(obj)
//     if (jQuery.inArray(bookResult[i].book[i], bookResult) !== -1) {
//         bookResult.push(obj)
//     }
//     for (let z = 0; z < bookResult[i].book.length; z++) {
//         var newHTML = template(bookResult[i].book[z]);
//         $book.append(newHTML);

//     }

// }


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$