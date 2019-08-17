$(function () {
    setTimeout(function () {
        console.log('start');
        var links = 1;
        var name;
        $("#description > yt-formatted-string > a").each(function(){
            links = $(this).attr('href');
            name = $(this).text();
            console.log(this);
            console.log(links);
            console.log(name);
            $("#info").before("<a href="+links+">"+name+"</a>");
        });
        console.log('end');
    }, 2000);
});
