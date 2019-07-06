$(function(){
  function buildMessage(message){
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
                    <p class="message__text">
                    ${message.content}
                    </p>
                    <img class="lower-message__image" ${message.image.url}>
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
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.input-box__text').val('');
    })
    .fail(function(){
    alert('エラー');
    })
    .always(function(){
      $('.submit-btn').removeAttr('disabled');
    })
  })
})