function get_title(links) {
    //    if (links == 'https://www.youtube.com/*') {
    //        chrome.runtime.sendMessage(links, function (response) {
    //            console.log('response : ' + response);
    //            return response;
    //        });
    //    }

    if (links.includes('search_query')) {
        console.log('search! ' + links);
        links = links.replace('/results?search_query=', '');
        var title = decodeURI(links);
        if (title.includes('%23')) {
            title = title.replace('%23', '#');
        } else {
            title = '検索：' + title;
        };
        return title;
    };

    if (links.includes('twitter.com')) {
        var id = links.replace('https://twitter.com/', '@');
        return id;
    };
};

function AddLinkButton(DOM) {
    $(DOM).each(function () {
        $(this).addClass("link_button");
        if ($(this).children('a').attr('href').includes('twitter.com') || $(this).children('a').attr('href').includes('search_query')) {
            $(this).children('a').addClass('twitter');
        } else {
            $(this).children('a').addClass('others');
        };
        console.log('end');
    })
};

$(function () {
    var links;
    var title;
    var place_URL = "#description > yt-formatted-string > a";
    setTimeout(function () {
        console.log('start');
        $(place_URL).each(function () {
            console.log(this);
            if ($(this).attr('href').includes('twitter.com')) {
                links = $(this).text();
            } else {
                links = $(this).attr('href');
            };
            title = get_title(links);
            console.log(title);
            $("#info").before("<extension><a href=" + links + ">" + title + "</a></extension>");
        });
        AddLinkButton("extension");
    }, 2000)
});
