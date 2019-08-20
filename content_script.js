function get_title(links) {
    chrome.runtime.sendMessage(links, function (response) {
        console.log('response : ' + response);
        return response;
    });
};

function AddLinkButton(DOM) {
    $(DOM).each(function () {
        $(this).addClass("link_button");
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
            links = $(this).text().replace('http:', 'https:');
            title = get_title(links);
            $("#info").before("<extension><a href=" + links + ">" + title + "</a></extension>");
        });
        AddLinkButton("extension");
    }, 2000)
});
