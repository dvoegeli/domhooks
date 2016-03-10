function deepStringValues( object ) {
  var strings = [];
  _.forEach( object, function ( value ) {
    if ( _.isString( value ) ) {
      strings.push( value );
    } else if ( _.isPlainObject( value ) ) {
      strings = _.union( strings, _.deepStringValues( value ) );
    }
  } );
  return strings;
}
_.mixin( { 'deepStringValues': deepStringValues } );
