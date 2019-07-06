$(function(){
  function buildMessage(message){
    console.log(message)

    if (message.content == null ){
      var message__text = ''
      }else{
      var message__text = `<p class>${message.content}</p>`
      }

    if (message.image.url == null){
      var message__image = ''
      }else{
      var message__image = `<img src="${message.image.url}
      "></div>`
      }

    var html = `<div class="message">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                    ${message.user.name}
                    </p>
                    <p class="message__upper-info__date">
                    ${message.created_at}
                    </p>
                  </div>
                  <div class="lower-message">
                  ${message__text}
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
})