# DomHooks
**An unopinionated schema for classes and ids between HTML/CSS and JavaScript**

*At the moment, it only works for Meteor.js.*

##Install
Include domhooks.js before class or id strings that uses the schema.

##Usage
To use DomHooks, create a schema then wrap a class or id string to validate it against the schema.

###Schema
Declare schemas before using the wrapper. A schema is a plain object with two requirements, 

1. values are unique
2. includes the key `'dh-schema-title'`, for example, `'dh-shema-title': 'message'` 

```javascript
var messageSchema = {
  'dh-shema-title': 'message',
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
};
```

##API

###DomHooks

####DomHooks.schema()
Include a schema.

```javascript
var messageSchema = {'dh-shema-title': 'message', ... };
DomHooks.schema(messageSchema);
```

####dh()

Validates a class or id string against a schema. Returns the string that is inside it. 

```javascript
// inline
var msg = dh('.message');
$(msg).on('click', showMessage);
//inline style
$(dh('.message')).on('click', showMessage);
```

Prints errors to the console and continues program execution.

*missing*

The tag is missing from the schema. Prints to console the tag, file path, and line number

`DomHook Missing: schema missing for ".message--important" at file path "client/chatroom.js", line 45`

*invalid*

The tag is not a string. Prints the tag, file path, and line number.

`DomHook Invalid: non-string "1" found at file path "client/chatroom.js", line 30`

#####dh().path();

Prints to console the location of both the tag and it's schema initialization.

*path*

Prints to console the tag, file path, and line number.

`DomHook Path: ".message__context--accepted" expression is at file path "client/chatroom.js", line 10`

*schema*

Prints to console the tag and the schema's file path and line.

`DomHook Schema: schema init for ".message__context" is at file path "client/schemas/message.js", line 12`






