
function generateId(file){
    // generate id by asynchronously calling express endpoint
    // var ret = $.get("/fileid?filename=" + encodeURI(file.name));
    var ret = $.ajax({
        type: "get",
        url: "/fileid?filename=" + encodeURI(file.name),
        data: "data",
        dataType: "text",
        success: function (response) {
            return response;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText, textStatus, errorThrown);
        }
    });
    return ret;
}
var t0, t1;
var r = new Resumable({
    target:'/upload',
    chunkSize:3*1024*1024,
    simultaneousUploads:5,
    // testChunks:false,
    throttleProgressCallbacks:1,
    generateUniqueIdentifier: generateId
});
// Resumable.js isn't supported, fall back on a different method
if(!r.support) {
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
    r.on('fileAdded', function(file){
        // Show progress pabr
        $('.resumable-progress, .resumable-list').show();
        // Show pause, hide resume
        $('.resumable-progress .progress-resume-link').hide();
        $('.resumable-progress .progress-pause-link').show();
        // Add the file to the list
        $('.resumable-list').append('<li class="resumable-file-'+file.uniqueIdentifier+'">Uploading <span class="resumable-file-name"></span> <span class="resumable-file-progress"></span>');
        $('.resumable-file-'+file.uniqueIdentifier+' .resumable-file-name').html(file.fileName);
        // Actually start the upload
        t0 = performance.now();
        $('.performance').html('measuring...');
        r.upload();
    });
    r.on('pause', function(){
        // Show resume, hide pause
        $('.resumable-progress .progress-resume-link').show();
        $('.resumable-progress .progress-pause-link').hide();
    });
    r.on('complete', function(){
        // Hide pause/resume when the upload has completed
        $('.resumable-progress .progress-resume-link, .resumable-progress .progress-pause-link').hide();
    });
    r.on('fileSuccess', function(file,message){
        // Reflect that the file upload has completed
        $('.resumable-file-'+file.uniqueIdentifier+' .resumable-file-name').html('<a href="/statics/'+file.fileName+'">'+file.fileName+'</a>')
        $('.resumable-file-'+file.uniqueIdentifier+' .resumable-file-progress').html('(completed)');
        t1 = performance.now();
        var result = t1 - t0;        
        console.log(result);

        // var result = performance.now() - performance;
        $('.performance-result').html(result);
    });
    r.on('fileError', function(file, message){
        // Reflect that the file upload has resulted in error
        $('.resumable-file-'+file.uniqueIdentifier+' .resumable-file-progress').html('(file could not be uploaded: '+message+')');
    });
    r.on('fileProgress', function(file){
        // Handle progress for both the file and the overall upload
        $('.resumable-file-'+file.uniqueIdentifier+' .resumable-file-progress').html(Math.floor(file.progress()*100) + '%');
        $('.progress-bar').css({width:Math.floor(r.progress()*100) + '%'});
    });
    r.on('cancel', function(){
        $('.resumable-file-progress').html('canceled');
    });
    r.on('uploadStart', function(){
        // Show pause, hide resume
        $('.resumable-progress .progress-resume-link').hide();
        $('.resumable-progress .progress-pause-link').show();
    });
}