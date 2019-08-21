function get_title(URL) {
    //    if (links == 'https://www.youtube.com/*') {
    //        chrome.runtime.sendMessage(links, function (response) {
    //            console.log('response : ' + response);
    //            return response;
    //        });
    //    }

    if (URL.includes('search_query')) {
        URL = URL.replace('/results?search_query=', '');
        var title = decodeURI(URL);
        title = '検索：' + title;
        return title;
    };

    if (URL.includes('twitter.com')) {
        if (URL.includes('search')) {
            var tag = URL.replace('https://twitter.com/search?q=%23', '#');
            return tag;
        } else {
            var id = URL.replace('https://twitter.com/', '@');
            return id;
        }
    };
};

function AddLinkButton(DOM) {
    $(DOM).each(function () {
        $(this).addClass("link_button");
        if ($(this).children('a').attr('href').includes('twitter.com')) {
            $(this).children('a').addClass('twitter');
        } else {
            $(this).children('a').addClass('others');
        };
    })
};

$(function () {
    var links;
    var title;
    var place_aTag = "#description > yt-formatted-string > a";
    setTimeout(function () {
        $(place_aTag).each(function () {
            if ($(this).attr('href').includes('twitter.com')) {
                links = $(this).text();
            } else if ($(this).attr('href').includes('search_query')) {
                links = $(this).attr('href').replace('/results?search_query=', '');
                links = decodeURI(links);
                links = 'https://twitter.com/search?q=' + links;
            } else {
                links = $(this).attr('href');
            };
            title = get_title(links);
            $("#info").before("<extension><a href=" + links + ">" + title + "</a></extension>");
        });
        AddLinkButton("extension");
    }, 2000)
});
