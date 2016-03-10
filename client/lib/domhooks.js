var self = this;
var hooks = {};
var serial = 0;
var cache = {};
var tag;
var schema = function ( _hooks ) {
  // make 
  hooks[ 'schema-' + serial ] = _hooks;
  hooks[ 'schema-' + serial ][ 'stack-trace' ] = ( new Error ).stack;
  serial += 1;
};
var _has = function () {
  if ( !_.isString( tag ) ) {
    _errorMessage( ( new Error ).stack, 'error' );
  } else if ( !_.deepHasString( hooks, tag ) ) {
    _errorMessage( ( new Error ).stack, 'missing' );
  }
  cache[ tag ] = true;
  return DomHooks;
};
var find = function ( _tag ) {
  tag = _tag;
  return cache[ tag ] ? DomHooks : _has();
}
var path = function ( environment ) {
  var location; // an array representation of the object path of value
  _.deepMapValues( hooks, function ( value, path ) {
    if ( _.isEqual( tag, value ) ) {
      location = path;
    }
  } );
  if ( location ) {
    var schema = location[ 0 ]; // first element of path is the schema
    var stackTrace = hooks[ schema ][ 'stack-trace' ];
    _errorMessage( ( new Error ).stack, 'path' );
    _errorMessage( stackTrace, 'schema' );
  }
};
function _errorMessage( stack, env ) {
  var stackLine = { 'path': 2, 'schema': 2, 'missing': 3, 'error': 3 };
  var rawFilePath = stack.split( '\n' )[ stackLine[ env ] ];
  var url = _extractUrl( rawFilePath );
  var rawLineNum = _extractRawLineNum( rawFilePath );
  var filePath = _extractFilePath( url );
  var options = {
    url: url,
    rawLineNum: rawLineNum,
    filePath: filePath,
    tag: tag,
    env: env,
  };
  ( function ( _options ) {
    $.when( _fetchScript(_options.url) )
    .done( function ( script ) {
      _printErrorMessage(script, _options)
    } )
  } )( options );
}

function _fetchScript( url ) {
  return $.ajax( {
    url: url,
    dataType: 'text'
  } );
}

function _printErrorMessage( script, options ) {
  var lineNum = _extractLineNum( script, options.rawLineNum );
  var message;
  switch ( options.env ) {
    case 'schema':
      message = 'DomHook Schema: schema initialization for "' + options.tag + '" is at file path "' + options.filePath + '", line ' + lineNum;
      break;
    case 'path':
      options.lineNum = _extractLineNum( script, options.rawLineNum );
      message = 'DomHook Path: "' + options.tag + '" expression is at file path "' + options.filePath + '", line ' + lineNum;
      break;
    case 'missing':
      options.lineNum = _extractLineNum( script, options.rawLineNum );
      message = 'DomHook Missing: schema missing for "' + options.tag + '" at file path "' + options.filePath + '", line ' + lineNum;
      break;
    case 'error':
      
      message = 'DomHook Error: non-string "' + options.tag + '" found at file path "' + options.filePath + '", line ' + lineNum;
      break;
  }
  console.error( message )
}
function _extractLineNum( script, rawLineNum ) {
  var line = script.split( '\n' )[ rawLineNum - 1 ];
  var extractLineNum = /\/\/\s(\d+)/;
  var lineNum = extractLineNum.exec( line )[ 1 ];
  return lineNum;
}

function _extractFilePath( url ) {
  var extracFilePath = /app\/(.*?)\?/;
  var filePath = extracFilePath.exec( url )[ 1 ];
  return filePath;
}

function _extractRawLineNum( rawFilePath ) {
  var extractFilePath = /:(\d+):{1}?/;
  var extractRawLineNum = extractFilePath.exec( rawFilePath )[ 1 ];
  return extractRawLineNum;
}

function _extractUrl( rawFilePath ) {
  var extractUrl = /(app.*?):/;
  var url = extractUrl.exec( rawFilePath )[ 1 ];
  return url;
}
DomHooks = {
  path: path,
  schema: schema,
  find: find
};
window.dh = DomHooks.find;
