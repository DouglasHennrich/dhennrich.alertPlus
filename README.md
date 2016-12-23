## Quick Start

### Get it [![gitTio](http://gitt.io/badge.svg)](http://gitt.io/component/dhennrich.alert)
Download this repository and consult the [Alloy Documentation](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_XML_Markup-section-35621528_AlloyXMLMarkup-ImportingWidgets) on how to install it, or simply use the [gitTio CLI](http://gitt.io/cli):

`$ gittio install dhennrich.alert`

### Notes
This is a modified [nl.fokkezb.loading](https://github.com/FokkeZB/nl.fokkezb.loading) widget. I took his structure as base for my widget, so all credits goes to him.

* Thanks [@FokkeZB](https://github.com/FokkeZB)

## How it looks like

![.AlertImage](/assets/alertImage.jpg)


## Add an Backbone's event to trigger the alert easily.

```js
// Alloy.js
var App = {};

App.Events = _.extend({
  Alert: alertFunctionHandler
}, Backbone.Events);

/*
@ alertFunctionHandler
*/
function alertFunctionHandler(params, Window){

  var setUpParams = {}
    , options = {}
    , alerta = Alloy.createWidget('dhennrich.alertPlus', {
      icon: (params.icon) ? true : false
      , image: (params.image) ? true : false
      , message: (params.message) ? true : false
      , picker: (params.picker) ? true : false
      , input: (params.input || params.inputHint) ? true : false
      , zIndex: 10
    })
    ;

  Window.add(alerta.getView());

  //
  params.icon && (setUpParams.icon = params.icon);
  params.image && (setUpParams.image = params.image);
  params.picker && (setUpParams.picker = params.picker);
  params.pickerHeight && (setUpParams.pickerHeight = params.pickerHeight);
  params.inputHint && (setUpParams.inputHint = params.inputHint);

  alerta.setUp(setUpParams);

  //
  if(params.cantExit){
    Window.cantExit = true;
  }

  //
  options.callback = function(res){
    params.callback && params.callback(res);
    Window.remove(alerta.getView());
    Window.cantExit = false;
  };

  _.defaults(options, params);

  alerta.show(options);

}
```

## XML

```xml
<Alloy>
  <Window id='win'/>
</Alloy>
```

## JS

```js
// Common usage
App.Events.Alert({
  message: 'Some Message'
  , attrMsg: [ 'Message' ]
  , btns: [ 'Cancel', 'Select' ]
  , callback:function(res){

    // res will be returned if you click on select button(second button)
    if(res){
      console.log('SELECTED');
    }

  }
}, $.win);
```

### Picker Example
```js
var tempArr = _.map([
    { something: 0, value: 'Picker' }
    , { something: 1, value: 'Example' }
  ], function(curr){

    return {
      style: 'oneValue'
      , title: {
        text: curr.value
        , color: Alloy.CFG.style.widget.picker.unselected
        , selectedColor: Alloy.CFG.style.widget.picker.selected
        , unSelectedColor: Alloy.CFG.style.widget.picker.unselected
        , font: { fontSize: 14, fontFamily: Alloy.CFG.style.fontSemiBold }
      }
      , data: curr
    };
  })
  ;

//
App.Events.Alert({
  message: 'Message'
  , btns: { title: 'Back', backgroundColor: Alloy.CFG.style.widget.buttonColorCancel }
  , callback:function(res){

    if(res){

      console.log(res.value);

    }

  }
  , picker: tempArr
  , pickerHeight: 80
}, $.win);
```

### As you can see, you need to add some stylings on your `config.json`:

```json
{
  "global":{

    "style":{

      "defaults":{

        "fontLight": "Titillium-Light"
        , "fontRegular": "Titillium-Regular"
        , "fontMedium": "Titillium-Medium"
        , "fontSemiBold": "Titillium-SemiBold"
        , "fontBold": "Titillium-Bold"

      }

      , "widget":{

        "alertBG":"#e1e1e1"
        , "loadingBG": "#FF3F3F3F"
        , "loadingMessage": "#BFBFBF"

        , "icon": "#535353"
        , "message": "#777777"
        , "separator": "#363434"

        , "buttonColor": "#535353"
        , "buttonColorCancel": "#282828"
        , "buttonLabel": "#fff"

        , "picker":{

          "toggle": "#99535353"
          , "unselected": "#777777"
          , "selected": "#fff"

        }
      }

    }
  }

  ...
}
```
