import 'uikit/dist/css/uikit.css'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import $ from 'jquery'

const apiKey = '3e75fa0fe8a8ea56a70bfb66a53e9220'
const meth = 'GET'
const url = 'https://api.flickr.com/services/rest/?' +
  'method=flickr.people.getPublicPhotos&' +
  'user_id=32951986%40N05&' +
  'extras=url_q&format=json&nojsoncallback=1&' +
  'api_key=' + apiKey

function loadPhotosJQ () {
  let photos = $('#photos')
  $.ajax('http://localhost:8091/serviceCors/i', {
    type: meth,
    dataType: 'json'
  }).done((data, textStatus, jqXHR) => {
    console.log(data)
    console.log(textStatus)
    console.log(jqXHR)
    // let cdiv = $('<div class="uk-flex">').append(
    //     $('<div style="height: 200px; overflow: auto;" class="uk-grid-collapse uk-grid-small uk-width-1-2" uk-grid>').attr('id', 'jqPhotos')
    //   ).append(
    //     $('<div class="uk-width-1-2">').append(
    //       $('<div class="uk-card uk-card-default uk-card-body" id="jqStatus">')
    //     )
    //   )
    //
    // console.log(data)
    // console.log(textStatus)
    // console.log(jqXHR.getAllResponseHeaders())
    // photos.empty()
    // photos.append(cdiv)
    // let jqPhotos = $('#jqPhotos')
    // let jqStatus = $('#jqStatus')
    // if (data.stat === 'ok') {
    //   let ims = data.photos.photo
    //   let i = 0
    //   let len = ims.length
    //   for (; i < len; i++) {
    //     jqPhotos.append(
    //       $('<div class="uk-tile uk-tile-default">').append(
    //         $('<img>', { src: ims[ i ].url_q })
    //       )
    //     )
    //   }
    // } else {
    //
    // }
    // bowfinben@cs.com
  })
  /*
  <div class="uk-width-1-2">
        <div class="uk-card uk-card-default uk-card-body">1-2</div>
    </div>
    <div class="uk-width-1-2">
        <div class="uk-card uk-card-default uk-card-body">1-2</div>
    </div>
   */
  // cdiv.attr('uk-grid')

  // var api_key = '3e75fa0fe8a8ea56a70bfb66a53e9220';
  // var method = 'GET';
  // var url = 'https://api.flickr.com/services/rest/?' +
  //   'method=flickr.people.getPublicPhotos&' +
  //   'user_id=32951986%40N05&' +
  //   'extras=url_q&format=json&nojsoncallback=1&' +
  //   'api_key=' + api_key;
  // var xhr = new XMLHttpRequest();
  // if (!('withCredentials' in xhr)) {
  //   alert('Browser does not support CORS.');
  //   return;
  // }
  // xhr.open(method, url, true);
  // xhr.onerror = function () {
  //   alert('There was an error.');
  // };
  // xhr.onload = function () {
  //   var data = JSON.parse(xhr.responseText);
  //   if (data.stat === 'ok') {
  //     var photosDiv = document.getElementById('photos');
  //     photosDiv.innerHTML = '';
  //     var photos = data.photos.photo;
  //     for (var i = 0; i < photos.length; i++) {
  //       var img = document.createElement('img');
  //       img.src = photos[i].url_q;
  //       photosDiv.appendChild(img);
  //     }
  //   } else {
  //     alert(data.message);
  //   }
  // };
  // xhr.withCredentials = true;
  // xhr.send();
}

$(document).ready(loadPhotosJQ)