function generateId(file) {
    var ret = $.ajax({
        type: "get",
        url: "/fileid?filename=" + encodeURI(file.name),
        data: "data",
        dataType: "text",
        success: function (response) {

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText, textStatus, errorThrown);
        }
    });
    return ret;
}

var setFileSize = function (fileSize) {
    console.log(parseFloat(fileSize));
    if (fileSize.length > 9) return parseFloat(fileSize / 1024 / 1024 / 1024).toFixed(2) + ' GB';
    if (fileSize.length > 6) return parseFloat(fileSize / 1024 / 1024).toFixed(2) + ' MB';
    if (fileSize.length > 3) return parseFloat(fileSize / 1024).toFixed(2) + ' KB';
}

var convRes = ['360p', '720p', '1080p'];
var fileNameArr = [];
var convertedNameArr = [];
document.addEventListener("DOMContentLoaded", function () {

    function getFileNames() {
        var getfn = $.ajax({
            type: "get",
            url: "/getfn",
            // async: false,
            // url: "/upload",
            data: "data",
            dataType: "text",
            success: function (response) {
                response = JSON.parse(response);
                console.log(response);

                for (let ii = 0; ii < response.length; ii++) {
                    var fileName = response[ii].split('#')[0];
                    var fileID = response[ii].split('#')[2];
                    var fileSize = setFileSize(response[ii].split('#')[1]);
                    // var element = response[ii];
                    $('.resumable-list').append(`<li class='resumable-file-${fileID}'>
                <span class='resumable-file-name'> 
                <p href='/statics/${fileName}'>${fileName}</p>
                </span>
                <span class='resumable-file-size ${fileSize}'>${fileSize}</span>
                <span class='resumable-file-progress'>
                
                <button class='convert${convRes[0]} convert${convRes[0]}-${fileID}'>${convRes[0]}</button>
                <button class='convert${convRes[1]} convert${convRes[1]}-${fileID}'>${convRes[1]}</button>
                <button class='convert${convRes[2]} convert${convRes[2]}-${fileID}'>${convRes[2]}</button>
                <button class='remove ${fileID}'>X</button>
                </span>
                                

                <div class='backgnd-status'></div>
                </li>`);

                }

                fileNameArr = response;
                // console.log(fileNameArr);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText, textStatus, errorThrown);
            }
        });
    }

    function getConvertedNames() {
        var getConverted = $.ajax({
            type: "get",
            url: "/getConverted",
            // async: false,
            // url: "/upload",
            data: "data",
            dataType: "text",
            success: function (response) {
                response = JSON.parse(response);
                console.log(response);
                fileNameArr.forEach(function (item, i) {
                    // console.log(item.split('#')[0],i);
                    for (var xx = 0; xx < response.length; xx++) {
                        var filename = response[xx].split('-ixi-')[0];
                        if (filename == item.split('#')[0]) {
                            // if(){}
                            // console.log(response[xx].split('-ixi-')[1].split('.')[0]);
                            if (response[xx].split('-ixi-')[1].split('.')[0] == convRes[0]) {
                                // console.log(response[xx].split('-ixi-')[1].split('.')[0],i);
                                $(`.resumable-file-${item.split('#')[2]}`)
                                    .children('.resumable-file-progress')
                                    .children(`.convert${convRes[0]}-${item.split('#')[2]}`).attr({
                                        'disabled': true
                                    });
                            } else if (response[xx].split('-ixi-')[1].split('.')[0] == convRes[1]) {
                                $(`.resumable-file-${item.split('#')[2]}`)
                                    .children('.resumable-file-progress')
                                    .children(`.convert${convRes[1]}-${item.split('#')[2]}`).attr({
                                        'disabled': true
                                    });
                            } else if (response[xx].split('-ixi-')[2].split('.')[0] == convRes[2]) {
                                $(`.resumable-file-${item.split('#')[2]}`)
                                    .children('.resumable-file-progress')
                                    .children(`.convert${convRes[2]}-${item.split('#')[2]}`).attr({
                                        'disabled': true
                                    });
                            }

                        }
                    }
                });

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText, textStatus, errorThrown);
            }
        });
    }
    getFileNames();
    getConvertedNames();

});


// var player = videojs('#videoPlayer');player.nuevo({shareTitle:"Nuevo plugin for VideoJs Player",related:related_videos,shareUrl:baseurl+"/nuevo/showcase/quality",shareTitle:"Nuevo plugin for VideoJs Player",slideImage:cdnurl+"/media/video/fit_slide.jpg"});

// var player = videojs('#videoPlayer', {
//     autoplay: 'muted',
//     controls: true,
//     aspectRatio: '16:9',
//     preload: 'auto',
//     playbackRates: [0.5, 1, 1.5, 2],
//     plugins: {
//         videoJsResolutionSwitcher: {
//           default: convRes[1],
//           dynamicLabel: true
//         }
//       }
// }, function () {
//     player.updateSrc([{
//         src: '/CONV/Pretty-Woman_-A-XXX-Parody_1.mp4' + '-ixi-' + convRes[0] + '.mp4',
//         type: 'video/mp4',
//         label: convRes[0]
//     }, {
//         src: '/CONV/Pretty-Woman_-A-XXX-Parody_1.mp4' + '-ixi-' + convRes[1] + '.mp4',
//         type: 'video/mp4',
//         label: convRes[1]
//     }]);

// // player.on('resolutionchange', function () {
// //     console.info('Source changed to %s', player.src())
// // })
// });
    // player.hotkeys({
    //     volumeStep: 0.1,
    //     seekStep: 5,
    //     enableModifiersForNumbers: false,
    //     enableHoverScroll: true,
    //     alwaysCaptureHotkeys: true,
    //     enableJogStyle: true,

    //     fullscreenKey: function (event, player) {
    //         console.log(event.which)
    //         // override fullscreen to trigger when pressing the F key or Ctrl+Enter
    //         return ((event.which === 70) || (event.ctrlKey && event.which === 13));
    //     }
    // });
var player = videojs('#videoPlayer');

player.nuevo({ // plugin options here 
    playlistUI: false, // set to disable playlist UI completely
    playlistShow: true, // set to hide playlist UI on start
    playlistAutoHide: false, // Disable playlist UI autohide on video play event
    playlistNavigation: true , // set to show playlist navigation arrows
    playlistRepeat: true, // set to repeat playlist playback
 });

 player.playlist([{
    sources: [{
      src: 'http://domain.com/video1.mp4',
      type: 'video/mp4'
    }],
    title: 'video 1 title',
    thumb: 'http://domain.com/video1_thumb.jpg', // Suggested size 80x45 px
    duration: '03:40',
  }, {
    // Multiple resolutions mp4 video
    sources: [{
      src: 'http://domain.com/video2_720p.mp4',
      type: 'video/mp4', res: '720', label: '720p'
    }, {
      src: 'http://domain.com/video2_360p.mp4',
      type: 'video/mp4', res: '360', label: '360p', //default
    }, {
      src: 'http://domain.com/video2_240p.mp4',
      type: 'video/mp4', res: '240', label: '240p'
    }],
    title: 'video 2 title',
    thumb: 'http://domain.com/video2_thumb.jpg', // Suggested size 80x45 px
    duration: '05:20',
    slideImage: 'http://domain.com/video2_slide.jpg', // Optional progressbar thumbs slide image
  }, {
    // HLS m3u8 playlist file
    sources: [{
      src: 'http://domain.com/playlist.m3u8',
      type: 'application/x-mpegURL'
    }],
    title: 'video 3 title',
    thumb: 'http://domain.com/video4_thumb.jpg',
    duration: '03:40',
  }]);



var t0, t1;
var r = new Resumable({
    target: '/upload',
    chunkSize: 4 * 1024 * 1024,
    simultaneousUploads: 4,
    // testChunks:false,
    throttleProgressCallbacks: 1,
    generateUniqueIdentifier: generateId
});

$('.resumable-list').on('click' || 'mousedown', 'p', function () {
    var filename = "/CONV/" + $(this).text() + '-ixi-720p.mp4';
    player = videojs('#videoPlayer');
    player.src([{
        aspectRatio: '16:9',
        type: 'video/mp4',
        src: filename
    }]);
    // console.log($("#videoPlayer").children('.vjs-control-bar').children('.vjs-quality-container'));
    // $("#videoPlayer").children('.vjs-control-bar').find('.vjs-quality-container').remove();
    player.updateSrc([
        // sources: [
        {
            label: convRes[0],
            src: '/CONV/' + $(this).text() + '-ixi-' + convRes[0] + '.mp4',
            type: 'video/mp4'
        },
        {
            label: convRes[1],
            src: '/CONV/' + $(this).text() + '-ixi-' + convRes[1] + '.mp4',
            type: 'video/mp4'
        },
        {
            label: convRes[2],
            src: '/CONV/' + $(this).text() + '-ixi-' + convRes[2] + '.mp4',
            type: 'video/mp4'
        }
        //   ],

        //   onFormatSelected: function(format) {
        //     console.log(format);
        //   },
    ]);
    // console.log($(this).text());
}).on('click', 'button', function () {
    console.log($(this));
    var fileName = $(this).parent().parent().children('.resumable-file-name').children('p').text();
    console.log(fileName);

    if ($(this).hasClass('remove')) {
        $.get('/rmFile?filename=' + fileName, function (result) {
            $(".resumable-file-" + result).remove();
        });
    } else if ($(this).hasClass('convert' + convRes[0])) {
        $(this).attr({
            'disabled': true
        });
        $.get('/convert' + convRes[0] + '?filename=' + fileName, function (result) {
            console.log(result);
        });
    } else if ($(this).hasClass('convert' + convRes[1])) {
        $(this).attr({
            'disabled': true
        });
        $.get('/convert' + convRes[1] + '?filename=' + fileName, function (result) {
            console.log(result);
        });
    } else if ($(this).hasClass('convert' + convRes[2])) {
        $(this).attr({
            'disabled': true
        });
        $.get('/convert' + convRes[2] + '?filename=' + fileName, function (result) {
            console.log(result);
        });
    }
})

if (!r.support) {
    $('.resumable-error').show();
} else {
    var dropElement = $('.resumable-drop');
    dropElement.show();
    r.assignDrop(dropElement[0]);
    r.assignBrowse($('.resumable-browse')[0]);
    dropElement.on("dragenter", function () {
        $(this).addClass('resumable-dragover');
    });
    dropElement.on("dragend", function () {
        $(this).removeClass('resumable-dragover');
    });
    dropElement.on("drop", function () {
        $(this).removeClass('resumable-dragover');
    });

    // Handle file add event
    r.on('fileAdded', function (file) {
        $('.resumable-list').append(`<li class="resumable-file-${file.uniqueIdentifier}"><span class="resumable-file-name">${file.fileName}</span><span class="resumable-file-size">${file.size}</span> <span class="resumable-file-progress"></span><div class="backgnd-status"></div></li>`);
        t0 = performance.now();
        $('.performance').html('measuring...');
        r.upload();
    });
    r.on('pause', function () {});
    r.on('complete', function () {});
    r.on('fileSuccess', function (file, message) {
        var fileSizeValue = $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-size').html();
        console.log(fileSizeValue);
        // Reflect that the file upload has completed
        $(`.resumable-file-${file.uniqueIdentifier}`).children(`.resumable-file-name`)
            .html(`<p href="/statics/${file.fileName}">${file.fileName} </p>`)
            .parent().children(`.resumable-file-size`)
            .html(setFileSize(fileSizeValue)).parent() /* .parent() */
            .children(`.resumable-file-progress`)
            .html(`<button class="convert${convRes[0]} ${file.uniqueIdentifier}">${convRes[0]}</button><button class="convert${convRes[1]} ${file.uniqueIdentifier}">${convRes[1]}</button><button class="remove ${file.uniqueIdentifier}">X</button>`);
        // $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-progress').html('(completed)');
        t1 = performance.now();
        var result = t1 - t0;
        console.log(result);

        // var result = performance.now() - performance;
        $('.performance').html(result);
    });
    r.on('fileError', function (file, message) {
        // Reflect that the file upload has resulted in error
        $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-progress').html('(file could not be uploaded: ' + message + ')');
    });
    r.on('fileProgress', function (file) {
        $(`.resumable-file-${file.uniqueIdentifier}`).children(`.resumable-file-progress`)
            .html(`${Math.floor(file.progress() * 100)}%`).parent()
            .children(`.backgnd-status`)
            .css({
                width: `${file.progress()* 100}%`
            });
        $('.progress-bar').css({
            width: Math.floor(file.progress() * 100) + '%'
        });
    });
    r.on('cancel', function () {
        console.log('cancel')
        $('.resumable-file-progress').html('canceled');
    });
    r.on('uploadStart', function () {

    });
    r.on('filesAdded', function (file) {
        // console.log('filesAdded', file);
    });

}