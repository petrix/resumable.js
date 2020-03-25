require('scssify');
var videojs = require('./nuevo/')
// var videojs = require('video.js');
require('./nuevo/videojs-RS');
require('./nuevo/videojs.hotkeys');
require('./style.css');
require('./nuevo/skins/pinko/videojs.min.css');

// const hotkeys = videojs.getPlugin('')

var $ = require('jquery');
// var videojs = require('video.js');

// var nuevo = require('./nuevo/nvideo.min');
// var videojs = require('./videojs-src/video.cjs');
// var hotkeys = require('./nuevo/videojs.hotkeys');

// var 
// var videojs = require('video.js');
videojs.options.hls.overrideNative = true;
videojs.options.html5.nativeAudioTracks = false;
videojs.options.html5.nativeTextTracks = false;
// var player = videojs("veoplayer");
// player.nuevo({
//     autoSetup:{},
//     shareTitle: "Nuevo plugin for VideoJs Player",
//     shareURL: "//nuevodevel.com/nuevo/playlist",
//     playlistUI: false, // set to disable playlist UI completely
//     playlistShow: false, // set to hide playlist UI on start
//     playlistAutoHide: true, // Disable playlist UI autohide on video play event
//     playlistNavigation: true, // set to show playlist navigation arrows
//     playlistRepeat: true, // set to repeat playlist playback
//     buttonForward: true,
//     shareMenu: false,
//     relatedMenu: false,
//     videoInfo: true,
//     resume: false,
//     //    contextMenu: false,
//     contextUrl: '#',
//     contextText: 'Short text, eg. Powered by...',
//     // contextIcon: '//www.domain.com/path/to/icon.png',
// });
var cdn = 'https://cdn.nuevodevel.com';
// player.hotkeys({
//     volumeStep: 0.1,
//     seekStep: 5,
//     alwaysCaptureHotkeys: true
// });

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
//         res: '720',
//                     default: 1

//     }, {
//         src: 'https://devnuevo.com/media/video/bmv_360.mp4',
//         type: 'video/mp4',
//         label: '360p',
//         res: '360'
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