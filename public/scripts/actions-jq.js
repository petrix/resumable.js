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
// var player = videojs('#videoPlayer');

// player.nuevo({ // plugin options here 
//     playlistUI: false, // set to disable playlist UI completely
//     playlistShow: true, // set to hide playlist UI on start
//     playlistAutoHide: false, // Disable playlist UI autohide on video play event
//     playlistNavigation: true , // set to show playlist navigation arrows
//     playlistRepeat: true, // set to repeat playlist playback
//  });

// videojs.options.hls.overrideNative = true;
// videojs.options.html5.nativeAudioTracks = false;
// videojs.options.html5.nativeTextTracks = false;
// var player = videojs("#videoPlayer");
// var player = videojs("veoplayer");
// player.nuevo({
//     related: related_videos,
//     shareTitle: "Nuevo plugin for VideoJs Player",
//     shareURL: "//nuevodevel.com/nuevo/playlist",
//     playlistUI: true, // set to disable playlist UI completely
//     playlistShow: true, // set to hide playlist UI on start
//     playlistAutoHide: true, // Disable playlist UI autohide on video play event
//     playlistNavigation: true, // set to show playlist navigation arrows
//     playlistRepeat: true, // set to repeat playlist playback
//     buttonForward: true,
//     shareMenu: false,
//     relatedMenu: false,
//     videoInfo: true,
//     //    contextMenu: false,
//     contextUrl: '#',
//     contextText: 'Short text, eg. Powered by...',
//     contextIcon: '//www.domain.com/path/to/icon.png',
// });
var cdn = 'https://cdn.nuevodevel.com';
player.hotkeys({
    volumeStep: 0.1,
    seekStep: 5,
    alwaysCaptureHotkeys: true
});

// player.playlist([{

//     sources: [{
//         src: 'https://devnuevo.com/media/video/animals_720.mp4',
//         type: 'video/mp4',
//         label: '720p',
//         res: '720'
//     }, {
//         src: 'https://devnuevo.com/media/video/animals_480.mp4',
//         type: 'video/mp4',
//         label: '480p',
//         res: '480',
//         default: 1
//     }, {
//         src: 'https://devnuevo.com/media/video/animals_360.mp4',
//         type: 'video/mp4',
//         label: '360p',
//         res: '360'
//     }, {
//         src: 'https://devnuevo.com/media/video/animals_240.mp4',
//         type: 'video/mp4',
//         label: '240p',
//         res: '240'
//     }],
//     url: 'https://www.nuevodevel.com/nuevo/order',
//     thumb: cdn + '/media/video/animals_thumb.jpg',
//     title: 'Wild Animals are everywhere, every country every land',
//     slideImage: cdn + '/media/video/animals_slide.jpg',
//     duration: '03:04'
// }, {
//     sources: [{
//         src: 'https://devnuevo.com/media/hls/redbull/m3u8/playlist.m3u8',
//         type: 'application/x-mpegURL'
//     }],
//     url: 'https://www.nuevodevel.com',
//     thumb: cdn + '/media/hls/redbull/thumb.jpg',
//     title: 'Red Bull Art of Motion (HLS)',
//     duration: '03:30'
// }, {
//     sources: [{
//         src: 'https://devnuevo.com/media/video/bmv_720.mp4',
//         type: 'video/mp4',
//         label: '720p',
//         res: '720'
//     }, {
//         src: 'https://devnuevo.com/media/video/bmv_360.mp4',
//         type: 'video/mp4',
//         label: '360p',
//         res: '360',
//         default: 1
//     }, {
//         src: 'https://devnuevo.com/media/video/bmv_240.mp4',
//         type: 'video/mp4',
//         label: '240p',
//         res: '240'
//     }],
//     thumb: cdn + '/media/video/bmv.jpg',
//     slideImage: cdn + '/media/video/bmv_slide.jpg',
//     title: 'BMW M4 - "Ultimate Racetrack"',
//     duration: '01:09'
// }, {
//     sources: [{
//         src: './nuevo/oops-20120802-manifest.mpd',
//         type: 'application/dash+xml'
//     }, {
//         src: './nuevo/ooops_360p.mp4',
//         type: 'video/mp4'
//     }],
//     thumb: cdn + '/media/oops/thumb.jpg',
//     title: 'Nexus Demo (MPEG-Dash)',
//     duration: '04:02'
// }, {
//     sources: [{
//         src: 'https://devnuevo.com/media/video/fit_1080.mp4',
//         type: 'video/mp4',
//         res: '1080',
//         label: '1080p'
//     }, {
//         src: 'https://devnuevo.com/media/video/fit_720.mp4',
//         type: 'video/mp4',
//         res: '720',
//         label: '720p'
//     }, {
//         src: 'https://devnuevo.com/media/video/fit_480.mp4',
//         type: 'video/mp4',
//         res: '480',
//         label: '480p'
//     }, {
//         src: 'https://devnuevo.com/media/video/fit_360.mp4',
//         type: 'video/mp4',
//         res: '360',
//         label: '360p',
//         default: 1
//     }, {
//         src: 'https://devnuevo.com/media/video/fit_240.mp4',
//         type: 'video/mp4',
//         res: '240',
//         label: '240p'
//     }],
//     thumb: cdn + '/media/video/fit_thumb.jpg',
//     slideImage: cdn + '/media/video/fit_slide.jpg',
//     title: 'Fitness keeps you younger and healthy',
//     duration: '01:33'

// }, {
//     sources: [{
//         src: 'https://devnuevo.com/media/video/big_buck_720.mp4',
//         type: 'video/mp4',
//         res: '720',
//         label: '720p'
//     }, {
//         src: 'https://devnuevo.com/media/video/big_buck_480.mp4',
//         type: 'video/mp4',
//         res: '480',
//         label: '480p'
//     }, {
//         src: 'https://devnuevo.com/media/video/big_buck_360.mp4',
//         type: 'video/mp4',
//         res: '360',
//         label: '360p',
//         default: 1
//     }, {
//         src: 'https://devnuevo.com/media/video/big_buck_240.mp4',
//         type: 'video/mp4',
//         res: '240',
//         label: '240p'
//     }],
//     thumb: cdn + '/media/video/big_buck_thumb.jpg',
//     slideImage: cdn + '/media/video/big_buck_slide.jpg',
//     title: 'Big Buck Bunny',
//     duration: '02:17'
// }, {
//     sources: [{
//         src: 'https://devnuevo.com/media/hls/blender/blender.m3u8',
//         type: 'application/x-mpegURL'

//     }],
//     thumb: cdn + '/media/hls/blender/blender.jpg',
//     title: 'Blender HLS/Fragmented MP4',
//     duration: '07:44'
// }, {
//     sources: [{
//         src: 'https://devnuevo.com/media/video/serenity_720.mp4',
//         type: 'video/mp4',
//         res: '720',
//         label: '720p'
//     }, {
//         src: 'https://devnuevo.com/media/video/serenity_480.mp4',
//         type: 'video/mp4',
//         res: '480',
//         label: '480p'
//     }, {
//         src: 'https://devnuevo.com/media/video/serenity_360.mp4',
//         type: 'video/mp4',
//         res: '360',
//         label: '360p',
//         default: 1
//     }, {
//         src: 'https://devnuevo.com/media/video/serenity_240.mp4',
//         type: 'video/mp4',
//         res: '240',
//         label: '240p'
//     }],
//     thumb: cdn + '/media/video/serenity_thumb.jpg',
//     slideImage: cdn + '/media/video/serenity_slide.jpg',
//     title: 'Serenity Movie Trailer',
//     duration: '02:13'
// }, {

//     sources: [{
//         src: 'https://devnuevo.com/media/video/cymaticjazz_720.mp4',
//         type: 'video/mp4',
//         res: '720',
//         label: '720p'
//     }, {
//         src: 'https://devnuevo.com/media/video/cymaticjazz_480.mp4',
//         type: 'video/mp4',
//         res: '480',
//         label: '480p'
//     }, {
//         src: 'https://devnuevo.com/media/video/cymaticjazz_360.mp4',
//         type: 'video/mp4',
//         res: '360',
//         label: '360p',
//         default: 1
//     }, {
//         src: 'https://devnuevo.com/media/video/cymaticjazz_240.mp4',
//         type: 'video/mp4',
//         res: '240',
//         label: '240p'
//     }],
//     thumb: cdn + '/media/video/cymaticjazz_thumb.jpg',
//     slideImage: cdn + '/media/video/cymaticjazz_slide.jpg',
//     title: 'LG Cymatic Jazz',
//     duration: '02:35'
// }]);
// player.chromecast();



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
    // player = videojs('#videoPlayer');
    player = videojs('#veoplayer');
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