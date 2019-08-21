chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var api = 'https://www.googleapis.com/youtube/v3/videos?part=snippet';
        var token = 'AIzaSyBtJqNli8wKJQE7Ozw_2lUgNlLtYQYlRNM';
        var videoId = request.replace('https://www.youtube.com/watch?v=', '');
        api += '&key=' + token + '&id=' + videoId + '&fields=items(snippet(title))';
        console.log('API : ' + api);
        var title = new XMLHttpRequest();
        title.open('GET', api);
        title.responseType = 'json';
        title.send();
        title.onload = function () {
            console.log(title.response);
            var videoTitle = title.response.items[0].snippet.title;
            console.log('send : ' + videoTitle);
            sendResponse(videoTitle);
        };
        return true;
    });
