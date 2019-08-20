function get_title(links) {
    $(function () {
        var title;
        $.ajax({
            type: 'GET',
            url: links,
            success: function (data) {
                title = data.match(/<title>(.*)<\/title>/);
            }
        })
        console.log(links);
        console.log(title);
        return title[1];
    });
};

function AddLinkButton(DOM) {
    console.log(DOM);
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
            links = $(this).attr('href').replace('http:', 'https:');
            title = "aaaa";
            $("#info").before("<extension><a href=" + links + ">" + title + "</a></extension>");
        });
        console.log('point');
        AddLinkButton("extension");
    }, 2000)
});
