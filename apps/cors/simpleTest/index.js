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
  // $.ajax(url, {
  //   type: meth,
  //   dataType: 'json'
  // }).done((data, textStatus, jqXHR) => {
  //   console.log(data)
  //   console.log(textStatus)
  //   console.log(jqXHR.getAllResponseHeaders())
  //   if (data.stat === 'ok') {
  //     let photos = $('#photos')
  //     photos.empty()
  //     let cdiv = $('div')
  //     cdiv.attr('uk-grid')
  //     photos.append(cdiv)
  //   } else {
  //
  //   }
  // })
  let photos = $('#photos')
  photos.empty()
  let cdiv = $('<div uk-grid>').append(
    $('<div>',{'class': 'uk-width-auto'}).append(
      $('<div>',{'class': 'uk-card uk-card-default uk-card-body'}).append($('<div uk-grid>',{id: 'jqPhotos'}))
    )
  ).append(
    $('<div>',{'class': 'uk-width-auto'}).append(
      $('<div>',{'class': 'uk-card uk-card-default uk-card-body', id: 'jqStatus'}).text('1-2')
    )
  )
  photos.append(cdiv)
  let jqPhotos = $('#jqPhotos')
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