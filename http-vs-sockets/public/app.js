$(function() {
  var messages = window.app.service('messages');

  $('form').on('submit', function(ev) {
    var requestNumber = parseInt($('#request-number').val(), 10);
    var start = new Date().getTime();
    var requests = [];

    for(var i = 0; i < requestNumber; i++) {
      requests.push(messages.create({
        text: 'Message #' + i
      }));
    }

    Promise.all(requests).then(() => {
      var duration = new Date().getTime() - start;
      console.log(requestNumber + ' requests took ' + duration + 'ms');
    }).catch(error => console.error('There was an error:', error.message));

    ev.preventDefault();
  });
});