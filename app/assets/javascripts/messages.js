$(document).on('turbolinks:load', function(){

  function buildMessage(message){
    var message__image = (message.image.url) ?  `<img src="${message.image.url}">` : ''
    var html =
      `<div class="message" data-message_id="${message.id}">
        <div class="message__upper-info">
          <p class="message__upper-info__talker">
            ${message.user_name}
          </p>
          <p class="message__upper-info__date">
            ${message.created_at}
          </p>
        </div>
        <div class="lower-message">
          <p class = message__text>
            ${message.content}
          </p>
          ${message__image}
        </div>
      </div>`
    return html;
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('エラー');
    })
    .always(function(){
      $('.submit-btn').removeAttr('disabled');
    })
  })

  var reloadMessages = function(){
    last_message_id = $('.message:last').data('message_id');
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      data: {id: last_message_id },
      dataType: 'json'
    })
    .done(function(messages){
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildMessage(message);
        $('.messages').append(insertHTML)
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
  }
  setInterval(reloadMessages, 9000);
});

