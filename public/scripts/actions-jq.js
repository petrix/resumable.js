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


var videoPlayer = $('#videoPlayer');
// var videoPlayer = document.querySelector('#videoPlayer');

// var socket = new io();
// function getId(fileName) {
//     var fnId = $.ajax({
//         type: "get",
//         async: false,
//         url: "/fileid?filename=" + encodeURI(fileName),
//         data: "data",
//         dataType: "text",
//         success: function (response) {
//             // console.log(response)
//             // return response;
//         },
//         error: function (XMLHttpRequest, textStatus, errorThrown) {
//             console.log('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText, textStatus, errorThrown);
//         }

//     });
//     return fnId.responseText;
// }
document.addEventListener("DOMContentLoaded", function () {
    var convRes = ['360p', '720p', '1080p'];
    var fileNameArr = [];
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
                <a href='/statics/${fileName}'> ${fileName} </a>
                </span>
                <span class='resumable-file-size ${fileSize}'>${fileSize}</span>
                <span class='resumable-file-progress'>
                
                <button class='convert360 convert360-${fileID}'>360p</button>
                <button class='convert720 convert720-${fileID}'>720p</button>
                <button class='remove ${fileID}'>X</button>
                </span>
                                

                <div class='backgnd-status'></div>
                </li>`);
                // $('.resumable-progress, .resumable-list').show();
                // console.log(getId(response[ii]));
                //    console.log(r.addFiles(fileID));
                //    console.log(r.getFromUniqueIdentifier(fileID));
            }
            // for(var xxx = 0; xxx< response.length; xxx++){
            //     var tmpName = response[xxx].split('#');
            //     fileNameArr.push(tmpName[0]);
            // }
            fileNameArr = response;
            // console.log(fileNameArr);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText, textStatus, errorThrown);
        }
    });

    var getfn = $.ajax({
        type: "get",
        url: "/getConverted",
        // async: false,
        // url: "/upload",
        data: "data",
        dataType: "text",
        success: function (response) {
            response = JSON.parse(response);
            console.log(response);
            fileNameArr.forEach(function(item,i){
                // console.log(item.split('#')[0],i);
                for(var xx= 0; xx< response.length;xx++){
                    var filename = response[xx].split('-ixi-')[0];
                    if(filename == item.split('#')[0]){
                        // if(){}
                        // console.log(response[xx].split('-ixi-')[1].split('.')[0]);
                        if(response[xx].split('-ixi-')[1].split('.')[0] == '360p'){
                        // console.log(response[xx].split('-ixi-')[1].split('.')[0],i);
                        $(`.resumable-file-${item.split('#')[2]}`)
                        .children('.resumable-file-progress')
                        .children(`.convert360-${item.split('#')[2]}`).attr({'disabled':true});
                        }else if(response[xx].split('-ixi-')[1].split('.')[0] == '720p'){
                            $(`.resumable-file-${item.split('#')[2]}`)
                            .children('.resumable-file-progress')
                            .children(`.convert720-${item.split('#')[2]}`).attr({'disabled':true});
                        }

                    }
                }
            });

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText, textStatus, errorThrown);
        }
    });

    var socket = io();
    console.log(socket);
    socket.on('connect',function(){
        console.log('connected');
    })
    socket.on('clock', function(result){
        console.log(result);
    });
    



});




var setFileSize = function (fileSize) {
    console.log(parseFloat(fileSize));
    if (fileSize.length > 9) return parseFloat(fileSize / 1024 / 1024 / 1024).toFixed(2) + ' GB';
    if (fileSize.length > 6) return parseFloat(fileSize / 1024 / 1024).toFixed(2) + ' MB';
    if (fileSize.length > 3) return parseFloat(fileSize / 1024).toFixed(2) + ' KB';
}

// $( "#selectable" ).selectable({
//     stop: function(){
//         $('.ui-selected', this).each(function(){
//             var index = $(this).children('.resumable-file-name').children('a').attr('href');
//             console.log(index);
//             player.src([
//                 {type: 'video/mp4', src: index}
//               ]);
//         });
//     }
// });


// var player = videojs('videoPlayer',{
//     autoplay: 'muted',
//     controls: true,
//     aspectRatio: '16:9',
//     preload: 'auto'
// });

var t0, t1;
var r = new Resumable({
    target: '/upload',
    chunkSize: 4 * 1024 * 1024,
    simultaneousUploads: 4,
    // testChunks:false,
    throttleProgressCallbacks: 1,
    generateUniqueIdentifier: generateId
});


$('.resumable-list').on('click', 'button', function () {
    var fileName = $(this).parent().parent().children('.resumable-file-name').children('a').attr('href').split('/')[2];
    console.log(fileName);

    if ($(this).hasClass('remove')) {
        $.get('/rmFile?filename=' + fileName, function (result) {
            $(".resumable-file-" + result).remove();
        });
    } else if ($(this).hasClass('convert720')) {
        $(this).attr({'disabled':true});
        $.get('/convert720?filename=' + fileName, function (result) {
            console.log(result);
        });
    } else if ($(this).hasClass('convert360')){
        $(this).attr({'disabled':true});
        $.get('/convert360?filename=' + fileName, function (result) {
            console.log(result);
        });
    }
}).on('click', 'li',function(){
    var filename = $(this).children('.resumable-file-name').children('a').attr('href');
    var filenameSplitted = filename.split('/');
    console.log(filenameSplitted[filenameSplitted.length-1]);
    videoPlayer.html(`<source src="${filename}" type="video/mp4">`);
    videoPlayer[0].play();
});

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
        // Add the file to the list
        $('.resumable-list').append(`<li class="resumable-file-${file.uniqueIdentifier}"><span class="resumable-file-name">${file.fileName}</span><span class="resumable-file-size">${file.size}</span> <span class="resumable-file-progress"></span><div class="backgnd-status"></div></li>`);
        // Actually start the upload
        t0 = performance.now();
        $('.performance').html('measuring...');
        r.upload();
    });
    r.on('pause', function () {
        // Show resume, hide pause
        // $('.resumable-progress .progress-resume-link').show();
        // $('.resumable-progress .progress-pause-link').hide();
    });
    r.on('complete', function () {
        // Hide pause/resume when the upload has completed
        // $('.resumable-progress .progress-resume-link, .resumable-progress .progress-pause-link').hide();
    });
    r.on('fileSuccess', function (file, message) {
        var fileSizeValue = $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-size').html();
        console.log(fileSizeValue);
        // Reflect that the file upload has completed
        $(`.resumable-file-${file.uniqueIdentifier}`).children(`.resumable-file-name`)
            .html(`<a href="/statics/${file.fileName}">${file.fileName} </a>`)
            .parent().children(`.resumable-file-size`)
            .html(setFileSize(fileSizeValue)).parent() /* .parent() */
            .children(`.resumable-file-progress`)
            .html(`<button class="convert360 ${file.uniqueIdentifier}">Convert 360</button><button class="convert720 ${file.uniqueIdentifier}">Convert 720</button><button class="remove ${file.uniqueIdentifier}">X</button>`);
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
        // Handle progress for both the file and the overall upload
        // console.log(file);
        // $(`.resumable-file-${file.uniqueIdentifier}`).children(`.resumable-file-progress`)
        //     .html('xxxx');
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
        // Show pause, hide resume
        // $('.resumable-progress .progress-resume-link').hide();
        // $('.resumable-progress .progress-pause-link').show();
    });
    r.on('filesAdded', function (file) {
        // console.log('filesAdded', file);
    });
    // r.on('chunkingComplete',function(file){
    //     console.log('chunkingComplete',file.uniqueIdentifier);
    // });
    // r.on('catchAll',function(file){
    //     console.log('catchAll',file);
    // });


}