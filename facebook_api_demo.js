Posts = new Mongo.Collection("posts");

if (Meteor.isClient) {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '724469854348779',
      status     : true,
      xfbml      : true,
      version    : '2.4'
    });
  };

  Template.body.events({
    'click .pull-data': function () {
      FB.api(
        '/verge/feed',
        'GET',
        {"fields":"comments,message", "access_token": "724469854348779|DOQ-d6jJe5qXpvjGgh-P5yR-eX0"},
        function(response) {
            // Insert your code here
            for (var i = 0; i < response.data.length; i++) {
              Posts.insert({text: response.data[i]});
            }
        }
      );
    }
  });

  Template.body.helpers({
    posts: function() {
      return Posts.find();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
