require('scssify');
var $ = require('jquery');
// var tooltipster = require('tooltipster');
var Resumable = require('./scripts/resumable');
require('./styles/main.scss');
// require('./fonts/DS-Digital.css');
var statePlaying = false;
var statePaused = false;


// var io = require('socket.io-client');
// var sPath = window.location.hostname;
// var dirCountDownIO = io.connect('http://' + sPath + ':3333/');


// dirCountDownIO.on('disconnect', (reason) => {
//     if (reason === 'io server disconnect') {
//         console.log('disconnected');
//     }
// });

var videoPlayer = document.querySelector('#videoplayer');
var progress = document.querySelector('#progress');
const ranges = document.querySelectorAll('.navigationSliders');
videoPlayer.ontimeupdate = progressUpdate;
progress.onmousedown = videoPlayhead;
// ranges.forEach(range => range.addEventListener('input change', handleRangeUpdate));

ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
// ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


function progressUpdate() {
    var d = videoPlayer.duration;
    var c = videoPlayer.currentTime;
    var val = (100 * c) / d;
    // console.log(c, d, val);
    if(val > 0){
          progress.value = val;
  
    }
    $('.currentTime').html(timeToTC(c));
    $('.totalTime').html(timeToTC(d));
}

function videoPlayhead() {
    var w = this.offsetWidth;
    var o = event.offsetX;
    console.log(o, w);
    this.value = 100 * o / w;
    videoPlayer.pause();
    videoPlayer.currentTime = videoPlayer.duration * (o / w);
    if (statePlaying) {
        videoPlayer.play();

    }
}
function handleRangeUpdate(){
    if(this.name == 'volume'){
        videoPlayer.volume = this.value;
    }else if(this.name == 'playbackSpeed'){
        videoPlayer.playbackRate = this.value;
        
    }
    console.log(this.value);
}
function videoPlay() {
    if(!statePlaying){
        videoPlayer.play();
    $('.play').addClass('playActive').text('PAUSE');
    statePlaying = true;
    }else{
        videoPlayer.pause();
    $('.play').removeClass('playActive').text('PLAY');
        statePlaying = false;
    }
    

    // statePaused = false;
    // statePlaying = true;
}


function videoStop() {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    $('.play').removeClass('playActive').text('PLAY');
    statePlaying = false;
}

$('.navigationButtons').on('mousedown' || 'click' || 'dbclick', 'button', function () {
    if ($(this).hasClass('play')) {
        videoPlay();
    } else if ($(this).hasClass('stop')) {
        videoStop();
    }

});





function timeToTC(dataDuration) {
    (dataDuration > 0) ? hours = Math.floor(dataDuration / 3600): hours = Math.abs(Math.ceil(dataDuration / 3600));
    (dataDuration > 0) ? minutes = Math.floor((dataDuration - hours * 3600) / 60): minutes = Math.abs(Math.ceil((dataDuration - hours * 3600) / 60));
    (dataDuration > 0) ? seconds = dataDuration - (minutes * 60 + hours * 3600): seconds = Math.abs(dataDuration - (minutes * 60 + hours * 3600));
    seconds = Math.floor(seconds);
    hours = ((hours < 10 && hours >= 0) ? "0" : "") + hours;
    minutes = ((minutes < 10 && minutes >= 0) ? "0" : "") + minutes;
    if (dataDuration < 0) {
        hours = "-" + hours;
    }
    seconds = ((seconds < 10 && seconds >= 0) ? "0" : "") + seconds;

    // $('.currentTime').text(hours + ':' + minutes + ':' + seconds);
    return hours + ':' + minutes + ':' + seconds;
}

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
    if (fileSize.length <= 3) return parseFloat(fileSize).toFixed(2) + ' Bytes';
}

var convRes = ['360p', '720p', '1080p'];
var fileNameArr = [];
var convertedNameArr = [];
document.addEventListener("DOMContentLoaded", function () {

    function getFileNames() {
        fetch(location.origin+'/getfn').then(res=> res.json()).then(response=>{
            console.log(response);

            for (let ii = 0; ii < response.length; ii++) {
                var fileName = response[ii].split('#')[0];
                var fileID = response[ii].split('#')[2];
                var fileSize = setFileSize(response[ii].split('#')[1]);
                // var element = response[ii];
                $('.resumable-list').append(`<li class='resumable-file-${fileID}'>
            <span class='resumable-file-name'> 
            <a href='/statics/${fileName}'>${fileName}</a>
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
        })
        // var getfn = $.ajax({
        //     type: "get",
        //     url: "/getfn",
        //     // async: false,
        //     // url: "/upload",
        //     data: "data",
        //     dataType: "text",
        //     success: function (response) {
        //         response = JSON.parse(response);
        //         console.log(response);

        //         for (let ii = 0; ii < response.length; ii++) {
        //             var fileName = response[ii].split('#')[0];
        //             var fileID = response[ii].split('#')[2];
        //             var fileSize = setFileSize(response[ii].split('#')[1]);
        //             // var element = response[ii];
        //             $('.resumable-list').append(`<li class='resumable-file-${fileID}'>
        //         <span class='resumable-file-name'> 
        //         <a href='/statics/${fileName}'>${fileName}</a>
        //         </span>
        //         <span class='resumable-file-size ${fileSize}'>${fileSize}</span>
        //         <span class='resumable-file-progress'>
                
        //  <button class='convert${convRes[0]} convert${convRes[0]}-${fileID}'>${convRes[0]}</button>
        //         <button class='convert${convRes[1]} convert${convRes[1]}-${fileID}'>${convRes[1]}</button>
        //         <button class='convert${convRes[2]} convert${convRes[2]}-${fileID}'>${convRes[2]}</button>

        //         <button class='remove ${fileID}'>X</button>
        //         </span>
                                

        //         <div class='backgnd-status'></div>
        //         </li>`);

        //         }
       
                

        //         fileNameArr = response;
        //         // console.log(fileNameArr);
        //     },
        //     error: function (XMLHttpRequest, textStatus, errorThrown) {
        //         console.log('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText, textStatus, errorThrown);
        //     }
        // });
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
                                    // console.log(response[xx].split('-ixi-')[1]);
                            } else if (response[xx].split('-ixi-')[1].split('.')[0] == convRes[2]) {
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
    // getConvertedNames();

});






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
    // var filename = "/CONV/" + $(this).text() + '-ixi-360p.mp4';
    // videoPlayer.src = filename;
    // videoPlayer.play();
}).on('click', 'button', function () {
    // console.log($(this));
    var fileName = $(this).parent().parent().children('.resumable-file-name').children('a').text();
    // console.log(fileName);

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
            .html(`<a href="/statics/${file.fileName}">${file.fileName} </a>`)
            .parent().children(`.resumable-file-size`)
            .html(setFileSize(fileSizeValue)).parent() /* .parent() */
            .children(`.resumable-file-progress`)
            .html(''+
        //    '<button class="convert${convRes[0]} ${file.uniqueIdentifier}">${convRes[0]}</button>'+
        //     '<button class="convert${convRes[1]} ${file.uniqueIdentifier}">${convRes[1]}</button>'+
        //     '<button class="convert${convRes[2]} ${file.uniqueIdentifier}">${convRes[2]}</button>'+
            '<button class="remove ${file.uniqueIdentifier}">X</button>');
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