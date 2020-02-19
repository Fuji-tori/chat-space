$(function(){
  function buildHTML(message){
    image = ( message.image ) ? `<img class= "message-text__image" src=${message.image} >` : "";
      var html =
        `<div class="message" data-message-id= "${message.id}">
          <div class="message__up-info">
            <div class="message__up-name">
              ${message.user_name}
            </div>
            <div class="message__up-day">
              ${message.created_at}
            </div>
          </div>
          <div class="message-text">
            <p class="message-text__content">
              ${message.content}
            </p>
          </div>
          ${image}
        </div>`
    return html;
  }
$('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $('.submit-btn').removeAttr('data-disable-with');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);      
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
})
var reloadMessages = function() {
  last_message_id = $('.message:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.chat-main__message-list').append(insertHTML);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    }
  })
  .fail(function() {
    console.log('error');
  });
};
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});