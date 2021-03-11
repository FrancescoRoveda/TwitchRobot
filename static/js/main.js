(function () {
    var signalObj = null;

    window.addEventListener('DOMContentLoaded', function () {
        var isStreaming = false;
        var video = document.getElementById('v');
        var canvas = document.getElementById('c');
        var ctx = canvas.getContext('2d');
        var effect = document.getElementById('effect');
        var isEffectActive = false;

        let address = "192.168.0.223:80/webrtc";
        var protocol = location.protocol === "https:" ? "wss:" : "ws:";
        var wsurl = protocol + '//' + address;
        if (!isStreaming) {
            signalObj = new signal(wsurl,
                    function (stream) {
                        console.log('got a stream!');
                        //var url = window.URL || window.webkitURL;
                        //video.src = url ? url.createObjectURL(stream) : stream; // deprecated
                        video.srcObject = stream;
                        var playPromise = video.play();

                        if (playPromise !== undefined) {
                          playPromise.then(_ => {
                            // Automatic playback started!
                            // Show playing UI.
                          })
                          .catch(error => {
                            // Auto-play was prevented
                            // Show paused UI.
                          });
                        }
                    },
                    function (error) {
                        alert(error);
                    },
                    function () {
                        console.log('websocket closed. bye bye!');
                        video.srcObject = null;
                        //video.src = ''; // deprecated
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        isStreaming = false;
                    },
                    function (message) {
                        alert(message);
                    }
            );
        }
        

        // Wait until the video stream can play
        video.addEventListener('canplay', function (e) {
            if (!isStreaming) {
                canvas.setAttribute('width', video.videoWidth);
                canvas.setAttribute('height', video.videoHeight);
                isStreaming = true;
            }
        }, false);

        // Wait for the video to start to play
        video.addEventListener('play', function () {
            // Every 33 milliseconds copy the video image to the canvas
            setInterval(function () {
                if (video.paused || video.ended) {
                    return;
                }
                var w = canvas.getAttribute('width');
                var h = canvas.getAttribute('height');
                ctx.fillRect(0, 0, w, h);
                ctx.drawImage(video, 0, 0, w, h);
                if (isEffectActive) {
                    detectFace(canvas);
                }
            }, 33);
        }, false);
    });
})();
