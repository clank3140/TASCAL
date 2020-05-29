function get_title(URL) {
    var defer = $.Deferred();
    if (URL.includes('youtube.com') || URL.includes('nicovideo')) {
        if (URL.includes('?sub_')) {
            URL = URL.replace('?sub_confirmation=1', '');
            chrome.runtime.sendMessage(URL, function (response) {
                defer.resolve([URL + '?sub_confirmation=1', response + 'のチャンネル登録']);
            });
        } else {
            chrome.runtime.sendMessage(URL, function (response) {
                defer.resolve([URL, response]);
            });
        }
    } else if (URL.includes('search_query')) {
        var query = URL.replace('/results?search_query=', '');
        query = '検索：' + decodeURI(query);
        defer.resolve([URL, query]);
    } else if (URL.includes('https://twitter.com') || URL.includes('http://twitter.com')) {
        if (URL.includes('http://twitter.com')) {
            URL = URL.replace('http', 'https');
        };
        if (URL.includes('search')) {
            var tag = URL.replace('https://twitter.com/search?q=%23', '#');
            defer.resolve([URL, tag]);
        } else {
            URL = URL.replace('https://twitter.com/', '');
            URL = URL.replace('/', '');
            if (URL.includes('?')) {
                index = URL.indexOf('?');
                URL = URL.substring(0, index);
            }
            var id = URL;
            URL = 'https://twitter.com/' + URL;
            defer.resolve([URL, id]);
        }
    } else {
        var text = URL;
        var index = text.indexOf('http');
        text = text.slice(index);
        if (text.includes('&')) {
            index = text.indexOf('\&');
            text = text.substring(0, index);
        }
        text = decodeURIComponent(text);
        text = list_search(get_list(), text);
        defer.resolve([URL, text]);
    }
    return defer.promise(this);
};

function AddLinkButton(DOM) {
    $(DOM).each(function () {
        $(this).addClass("link_button");
        $(this).children('a').attr('target', '_blank');
        var aTag = $(this).children('a');
        if (aTag.attr('href').includes('https://twitter.com')) {
            aTag.addClass('twitter');
        } else if (aTag.attr('href').includes('youtube.com')) {
            aTag.addClass('youtube');
        } else if (aTag.attr('href').includes('nicovideo')) {
            aTag.addClass('nico');
        } else {
            aTag.addClass('others');
        };
    })
};

var page_url;

function get_list() {
    var place_list = chrome.runtime.getURL("/list.txt");
    var title_list = [];
    $.get(place_list, function (aaa) {
        title_list = eval(aaa);
        console.log(title_list);
    });
    return title_list;
};


function list_search(list, src) {
    console.log(list);
    var obj = list.find(function (item) {
        if (item.url === src) return true;
    });
    if (obj == undefined) {
        return src;
    } else {
        return obj.title;
    }
};

$(document.head).on('DOMSubtreeModified propertychange', function () {
    console.log('page_url : ' + page_url);
    if (page_url != location.href) {
        $('extension').each(function () {
            $(this).remove();
        });
        var links;
        var place_aTag = "#description > yt-formatted-string > a";
        setTimeout(function () {
            $(place_aTag).each(function () {
                if ($(this).attr('href').includes('https%3A%2F%2Ftwitter.com') || $(this).attr('href').includes('http%3A%2F%2Ftwitter.com') || $(this).attr('href').includes('nicovideo')) {
                    links = $(this).text();
                } else if ($(this).attr('href').includes('search_query')) {
                    links = $(this).attr('href').replace('/results?search_query=', '');
                    links = 'https://twitter.com/search?q=' + decodeURI(links);
                } else if ($(this).attr('href').includes('/watch')) {
                    links = 'https://www.youtube.com' + $(this).attr('href');
                } else {
                    links = $(this).attr('href');
                };
                $.when(get_title(links)).done(function (URL_title) {
                    console.log(URL_title);
                    var insert_place = $("#top-row");
                    console.log(insert_place);
                    insert_place.before("<extension><a href=" + URL_title[0] + ">" + URL_title[1] + "</a></extension>");
                    AddLinkButton("extension");
                });
            });
        }, 2000);
        page_url = location.href;
    };
});