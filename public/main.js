$(function () {

  $.getJSON('https://api.myjson.com/bins/dd5vj', function (json) {
    createTable(json);
  });

  var login = $("#signupButton");
  var logout = $("#signoutButton");
  var hasUser = false;

  firebase.auth().onAuthStateChanged(function (user) {

    if (user != null) {
      hasUser = true;
      $('#email').val("");
      $('#password').val("");
      $('#signoutButton').show();
      $('#navSign').hide();
      $('.commentButton').show();
    } else {
      hasUser = false;
      $('#signoutButton').hide();
      $('.commentButton').hide();
      $('#navSign').show();
    }
  })

  login.on("click", function () {
    var $email = $('#email');
    var $password = $('#password');
    $('.signUp').hide();


    firebase.auth().signInWithEmailAndPassword($email.val(), $password.val());

  });

  logout.on("click", function () {
    firebase.auth().signOut();

  });

  function createTable(json) {
    var id = "match";
    var link = 'onClick="document.getElementById(' + "'match'" + ').scrollIntoView();"';

    for (var i = 0; i < json.matches.length; i++) {

      var tr = document.createElement('tr');

      tr.insertCell().innerHTML = json.matches[i].teams.home.name;
      tr.insertCell().innerHTML = json.matches[i].teams.away.name;
      tr.insertCell().innerHTML = '<button ' + link + ' class="btn btn-info mybutton" data-index="' + i + '">More Info</button>';

      $('#matches').append(tr);
    }

    $('.mybutton').on('click', function () {

      drawInfo(json, $(this).attr('data-index'));
    });
  };


  function drawInfo(json, index, target) {

    $('#match').empty();

    var $details = $('<div/>').addClass('detals');
    var $logos = $('<div/>').addClass('escudos');
    var $logo = $('<div/>').addClass('escudo');
    var $logo2 = $('<div/>').addClass('escudo');
    var $vs = $('<div/>').addClass('vs');
    var $name = $('<div/>').addClass('name');
    var $name2 = $('<div/>').addClass('name');
    var $date = $('<div/>').addClass('date');
    var $time = $('<div/>').addClass('time');
    var $field = $('<div/>').addClass('field');
    var $buttons = $('<div/>').addClass('divButtons');
    var $map = $('<div/>').addClass('map');
    var $textComment = $(`<button type="button" class="btn btn-info commentButton" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Comment</button>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="form-control-label">User:</label>
            <input type="text" class="form-control" id="recipient-name">
          </div>
          <div class="form-group">
            <label for="message-text" class="form-control-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
          <div class="form-group">
            <label for="message-text" class="allComments">All Comments:</label>
            <textarea rows="7" class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success">Send message</button>
      </div>
    </div>
  </div>
</div>`);
    $('.commentButton').hide();

    var $button = $('<button class="btn btn-info mapButton" id="buttons">Show map</button>');

    $logo.append('<img src="images/' + json.matches[index].teams.home.logo + '">');
    $logo.append($name);
    $map.append('<iframe src="' + json.matches[index].field.map + '"></iframe>');
    $logo2.append('<img src="images/' + json.matches[index].teams.away.logo + '">');
    $logo2.append($name2);
    $vs.append('vs');
    $date.append(json.matches[index].field.date);
    $time.append(json.matches[index].field.time);

    $logos.append($logo, $vs, $logo2);

    $name.append(json.matches[index].teams.home.name);
    $name2.append(json.matches[index].teams.away.name);

    $field.append(json.matches[index].field.name);

    $buttons.append($textComment, $button);

    $('#match').append($logos, $field, $date, $time, $buttons);

    $('.mapButton').on("click", function () {
      $('#match').append($map);
    })

    $('.mybutton').on("click", function () {
      $('#match').show();
      if (!hasUser) {
        $('.commentButton').hide();
      }
    })


  }

  $('#about').hide(); //muestro mediante id
  $('.home').show();
  $('#info').hide();
  $('#contact').hide();
  $('.signUp').hide();



  $("#about").ready(function () {
    $("#navAbout").on("click", function () {
      $('#about').show(); //muestro mediante id
      $('.home').hide();
      $('#info').hide();
      $('#contact').hide();
      $('.signUp').hide();
    });
  });

  $(".home").ready(function () {
    $("#navIndex").on("click", function () {
      $('.home').show();
      $('#info').hide();
      $('#about').hide();
      $('#contact').hide();
      $('.signUp').hide();
    })
  })

  $("#info").ready(function () {
    $("#navInfo").on("click", function () {
      $('#info').show();
      $('.home').hide();
      $('#about').hide();
      $('#contact').hide();
      $('.signUp').hide();
    })
  })

  $("#contact").ready(function () {
    $("#navContact").on("click", function () {
      $('#contact').show();
      $('#info').hide();
      $('#about').hide();
      $('.home').hide();
      $('.signUp').hide();
    })
  })

  $(".signUp").ready(function () {
    $("#navSign").on("click", function () {
      $('.signUp').show();
      $('#info').hide();
      $('#about').hide();
      $('.home').show();
      $('#contact').hide();
    })
  })
});
