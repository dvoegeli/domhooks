// counter starts at 0
Session.setDefault( 'counter', 0 );
Template.hello.helpers( {
  counter: function () {
    return Session.get( 'counter' );
  }
} );
Template.hello.events( {
  'click button': function () {
    // increment the counter when button is clicked
    Session.set( 'counter', Session.get( 'counter' ) + 1 );
  }
} );
Meteor.startup( function () {
  _ = lodash;
  var arrowSchema = {
    'note': {
      'arrow': {
        'base': '#note-arrow',
        'head': '#note-arrow__head',
        'base-colors': {
          'red': '#note-arrow--red',
          'blue': '#note-arrow--blue'
        }
      },
    }
  }
  DomHooks.schema( arrowSchema );
  var lineSchema = {
    'note': {
      'line': {
        'base': '#note-line',
        'base-colors': {
          'red': '#note-line--red',
          'blue': '#note-line--blue'
        }
      },
    }
  }
  DomHooks.schema( lineSchema );
  dh( '#note-arrow--blue' );
  dh( '#note-line--blue' );
  dh( '#note-circle--green' );
} );
dh( '#note-box--blue' );
dh( '#note-circle--green' ).path();