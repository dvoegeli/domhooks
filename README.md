# DomHooks
**An unopinionated schema for classes and ids between HTML/CSS and JavaScript**

*At the moment, it only works for Meteor.js.*

##Install
Include domhooks.js before class or id strings that use the schema.

##Usage
To use DomHooks, create a schema then wrap a class or id string to validate it against the schema.

###Schema
Declare schemas before using the wrapper. A schema is a plain object with three requirements, 

1. values are unique
2. includes the key `'dh-title'`, for example, `'dh-title': 'message'` 
2. includes the key `'dh-schema'`, for example, `'dh-schema': {...}` 

```javascript
var messageSchema = {
  'dh-title': 'message',
  'dh-schema': {
    'message': '.message',
    'style': {
      'normal': '.message__style'
      'bold': '.message__style--bold',
      'italics': '.message__style--italics'
    },
    'context': {
      'warning': '.message__context--warning',
      'accepted': '.message__context--highlight'
    }
  }
};
```

##API

###DomHooks

####DomHooks.addSchema()
Include a schema.

```javascript
var messageSchema = {'dh-schema-title': 'message', ... };
DomHooks.schema(messageSchema);
```

###dh( [class|id] , ... )

Validates a class or id string against a schema. Has two parameters, a class or id and zero or more options. Returns the string that is inside it. 

```javascript
$(dh('.message')).on('click', showMessage);
```

If a class or id string is invalid, an error-like message prints to the console and continues program execution.

*missing message*

The tag is missing from the schema. Prints to console the tag, file path, and line number

`DomHook Missing: schema missing for ".message--important" at file path "client/chatroom.js", line 45`

*invalid message*

The input is not a string. Prints the input, file path, and line number.

`DomHook Invalid: non-string "1" found at file path "client/chatroom.js", line 30`

####options

There can be zero or more options. Order does not matter. Options are comma separated strings. The following options are available.

*path*

Prints two messages to the console.

`dh('messages', 'path');`

*path message*

Prints to console the tag, file path, and line number.

`DomHook Path: ".message__context--accepted" expression is at file path "client/chatroom.js", line 10`

*schema message*

Prints to console the tag and the schema initialization's file path and line number.

`DomHook Schema: schema init for ".message__context" is at file path "client/schemas/message.js", line 12`






