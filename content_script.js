function get_title(URL) {
    var defer = $.Deferred();
    if (URL.includes('/watch') || URL.includes('/channel')) {
        if (URL.includes('?sub_')) {
            defer.resolve([URL, 'チャンネル登録']);
        } else {
            chrome.runtime.sendMessage(URL, function (response) {
                defer.resolve([URL, response]);
            });
        }
    } else if (URL.includes('search_query')) {
        URL = URL.replace('/results?search_query=', '');
        var title = decodeURI(URL);
        title = '検索：' + title;
        defer.resolve([URL, title]);
    } else if (URL.includes('https://twitter.com')) {
        if (URL.includes('search')) {
            var tag = URL.replace('https://twitter.com/search?q=%23', '#');
            defer.resolve([URL, tag]);
        } else {
            var id = URL.replace('https://twitter.com/', '@');
            defer.resolve([URL, id]);
        }
    } else {
        var text=URL;
        var index = text.indexOf('q=');
        text = text.slice(index + 2);
        index = text.indexOf('&v=');
        text = text.substring(0, index);
        console.log(decodeURIComponent(text));
        defer.resolve([URL, decodeURIComponent(text)]);
    }
    return defer.promise(this);
};

function AddLinkButton(DOM) {
    $(DOM).each(function () {
        $(this).addClass("link_button");
        $(this).children('a').attr('target', '_blank');
        if ($(this).children('a').attr('href').includes('https://twitter.com')) {
            $(this).children('a').addClass('twitter');
        } else if ($(this).children('a').attr('href').includes('/watch')) {
            $(this).children('a').addClass('youtube');
        } else if ($(this).children('a').attr('href').includes('/channel/')) {
            $(this).children('a').addClass('youtube');
        } else {
            $(this).children('a').addClass('others');
        };
    })
};

$(function () {
    var links;
    var place_aTag = "#description > yt-formatted-string > a";
    setTimeout(function () {
        $(place_aTag).each(function () {
            if ($(this).attr('href').includes('https%3A%2F%2Ftwitter.com')) {
                links = $(this).text();
            } else if ($(this).attr('href').includes('search_query')) {
                links = $(this).attr('href').replace('/results?search_query=', '');
                links = decodeURI(links);
                links = 'https://twitter.com/search?q=' + links;
            } else {
                links = $(this).attr('href');
            };
            $.when(get_title(links)).done(function (URL_title) {
                $("#info").before("<extension><a href=" + URL_title[0] + ">" + URL_title[1] + "</a></extension>");
                AddLinkButton("extension");
            });
        });
    }, 2000);
});
