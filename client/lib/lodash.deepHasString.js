function deepHasString( object, string ) {
  return (
    _.isString( string ) &&
    !!_.find( _.deepStringValues( object ), function ( value ) {
      return _.isEqual( string, value );
    } )
  );
}
_.mixin( { 'deepHasString': deepHasString } );
