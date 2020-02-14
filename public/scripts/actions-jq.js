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
function getId(fileName) {
    var fnId = $.ajax({
        type: "get",
        async: false,
        url: "/fileid?filename=" + encodeURI(fileName),
        data: "data",
        dataType: "text",
        success: function (response) {
            // console.log(response)
            // return response;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText, textStatus, errorThrown);
        }
        
    });
    return fnId.responseText;
}
document.addEventListener("DOMContentLoaded", function () {
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
                var fileID = getId(fileName);
                var fileSize = setFileSize(response[ii].split('#')[1]);
                // var element = response[ii];
                $('.resumable-list').append('<li class="resumable-file-'+ fileID +'"><span class="resumable-file-name"> <a href="/statics/' + fileName + '">' + fileName + '</a></span><span class="resumable-file-size">'+fileSize+'</span><button class="remove '+fileID+'">X</button>');
                $('.resumable-progress, .resumable-list').show();
                // console.log(getId(response[ii]));
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText, textStatus, errorThrown);
        }
    });
});

function setFileSize(fileSize){
    if(fileSize.length>9) return parseFloat(fileSize/1024/1024/1024).toFixed(2) + ' GB';
    if(fileSize.length>6) return parseFloat(fileSize/1024/1024/1024).toFixed(2) + ' MB';
    if(fileSize.length>3) return parseFloat(fileSize/1024/1024/1024).toFixed(2) + ' KB';


}

$('.resumable-list').on('click','button', function(){
    var fileName = $(this).parent().children('span').children('a').attr('href').split('/')[2];
    $.get('/rmFile?filename='+fileName, function(result){
        console.log(result);
        $(".resumable-file-"+result).remove();
    });
    // console.log(fileName);
});




var t0, t1;
var r = new Resumable({
    target: '/upload',
    chunkSize: 3 * 1024 * 1024,
    simultaneousUploads: 5,
    // testChunks:false,
    throttleProgressCallbacks: 1,
    generateUniqueIdentifier: generateId
});
// Resumable.js isn't supported, fall back on a different method
if (!r.support) {
    $('.resumable-error').show();
} else {
    // Show a place for dropping/selecting files
    var dropElement = $('.resumable-drop');
    dropElement.show();
    r.assignDrop(dropElement[0]);
    r.assignBrowse($('.resumable-browse')[0]);
    // r.assignBrowse($('.resumable-browse'));

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
        // Show progress pabr
        $('.resumable-progress, .resumable-list').show();
        // Show pause, hide resume
        $('.resumable-progress .progress-resume-link').hide();
        $('.resumable-progress .progress-pause-link').show();
        // Add the file to the list
        $('.resumable-list').append('<li class="resumable-file-' + file.uniqueIdentifier + '"><span class="resumable-file-name"></span><span class="resumable-file-size">'+file.size+'</span> <span class="resumable-file-progress"></span>');
        $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-name').html(file.fileName);
        // Actually start the upload
        t0 = performance.now();
        $('.performance').html('measuring...');
        r.upload();
    });
    r.on('pause', function () {
        // Show resume, hide pause
        $('.resumable-progress .progress-resume-link').show();
        $('.resumable-progress .progress-pause-link').hide();
    });
    r.on('complete', function () {
        // Hide pause/resume when the upload has completed
        $('.resumable-progress .progress-resume-link, .resumable-progress .progress-pause-link').hide();
    });
    r.on('fileSuccess', function (file, message) {
        // Reflect that the file upload has completed
        $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-name').html('<a href="/statics/' + file.fileName + '">' + file.fileName + '</a>').parent().children('.resumable-file-progress').html('<button class="remove '+file.uniqueIdentifier+'">X</button>');
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
        $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-progress').html(Math.floor(file.progress() * 100) + '%');
        $('.progress-bar').css({
            width: Math.floor(r.progress() * 100) + '%'
        });
    });
    r.on('cancel', function () {
        console.log('cancel')
        $('.resumable-file-progress').html('canceled');
    });
    r.on('uploadStart', function () {
        // Show pause, hide resume
        $('.resumable-progress .progress-resume-link').hide();
        $('.resumable-progress .progress-pause-link').show();
    });
}




