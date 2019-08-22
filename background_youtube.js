chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.includes('youtube')) {
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
                } else if (request.includes('/playlist')) {
                    api = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet';
                    videoId = request.replace('https://www.youtube.com/playlist?list=', '');
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
        } else if (request.includes('nicovideo')) {
            var api = 'http://ext.nicovideo.jp/api/getthumbinfo/';
            var videoId = request.replace('http://www.nicovideo.jp/watch/', '');
            api += videoId;
            console.log('API : ' + api);
            var title = new XMLHttpRequest();
            title.open('GET', api);
            title.send();
            title.onload = function () {
                var xml = $.parseXML(title.response);
                var videoTitle = xml.getElementsByTagName('title')[0].textContent;
                console.log('send : ' + videoTitle);
                sendResponse(videoTitle);
            };
            return true;
        }
    });
