chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        $.get('/key', function (data) {
            var token = data;
            console.log('token : ' + token);
            var api;
            var videoId;
            if (request.includes('/watch')) {
                api = 'https://www.googleapis.com/youtube/v3/videos?part=snippet';
                videoId = request.replace('/watch?v=', '');
            } else if (request.includes('/channel')) {
                api = 'https://www.googleapis.com/youtube/v3/channels?part=snippet';
                videoId = request.replace('https://www.youtube.com/channel/', '');
            };
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
        });
        return true;
    });
