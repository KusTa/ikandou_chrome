(function () {
    var API = "http://ikandou.com/api/getbooks";
    var subjectEls = $(".article .item");
    var bookId2Els = {};
    var bookIds = [];

    subjectEls.each(function () {
        var el = $(this);
        var bookURL = el.find(".title a").attr('href');
        var bookId = bookURL.match(/\d+/)[0];
        bookId2Els[bookId] = el;
        bookIds.push(bookId);
    })

    var xhr = new XMLHttpRequest();
    xhr.open("GET",
             API + "?ids=" + bookIds.join(","),
             true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
           var result = JSON.parse(xhr.response);
           $.each(result, function (bid, ob) {
               if (ob) {
                   var el = bookId2Els[bid];
                   var target = el.find("li.intro + li");
                   target.append('<a class="ikd-lnk" target="_blank" href="' +
                                   ob.url + '">爱看豆</a>');
               }
           });

           delete bookId2Els;
           delete bookIds;
           delete subjectEls;
        }
    }
    xhr.send();
})();