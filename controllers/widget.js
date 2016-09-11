/*
@
*/
var inputUp = false;

/*
@ cleanUp
*/
function cleanUp(){
  if(OS_ANDROID) $.viewBtns.removeAllChildren();
  else{
    for( var i = $.viewBtns.children.length; i > 0; i-- ){
      $.viewBtns.remove( $.viewBtns.children[i-1] );
    }
  }
}

/*
@ transformMessage
*/
function transformMessage(args){
  var attributesArr = [];

  if(_.isArray(args.attrMsg)){
    args.attrMsg.forEach(function(stringAttr){
      attributesArr.push({
        type: Ti.UI.ATTRIBUTE_FONT
        , value: { fontSize: 16, fontFamily: Alloy.CFG.style.fontBold }
        , range: [args.message.indexOf(stringAttr), stringAttr.length]
      });
    });

  }else{
    attributesArr.push({
      type: Ti.UI.ATTRIBUTE_FONT
      , value: { fontSize: 16, fontFamily: Alloy.CFG.style.fontBold }
      , range: [args.message.indexOf(args.attrMsg), args.attrMsg.length]
    });
  }

  var attr = Ti.UI.createAttributedString({
    text: args.message
    , attributes: attributesArr
  });

  $.message.attributedString = attr;
}

/*
@ show
*/
function show(){
  var args = arguments[0] || {};

  args.icon && $.icon.applyProperties(args.icon);
  args.message && ($.message.text = args.message);
  args.attrMsg && transformMessage(args);
  $.args.input && ($.viewInput.top = 20);
  args.picker && $.picker.show();
  $.viewBtns.top = 20;

  if(args.btns){
    if(_.isArray(args.btns)){

      var buttonLeft = $.UI.create('Button',{
        classes: ['localBtns', 'localLeftBtn']
        , index: 0
      });
      if(_.isObject(args.btns[0])) buttonLeft.applyProperties(args.btns[0]);
      else buttonLeft.title = args.btns[0];

      buttonLeft.addEventListener('click', function(event){
        hide();
        args.callback && args.callback();
      });

      var buttonRight = $.UI.create('Button',{
        classes: ['localBtns', 'localRightBtn']
        , index: 1
      });
      if(_.isObject(args.btns[1])) buttonRight.applyProperties(args.btns[1]);
      else buttonRight.title = args.btns[1];

      buttonRight.addEventListener('click', function(event){
        hide();
        var btnReturns = this.index;

        args.picker && (btnReturns = $.picker.selectedItem());
        $.args.input && (btnReturns = $.inputField.getValue());

        args.callback && args.callback(btnReturns);
      });

      $.viewBtns.add(buttonLeft);
      $.viewBtns.add(buttonRight);

    }else{

      var btn = $.UI.create('Button',{
        classes: ['localBtns']
        , left: null
      });
      if(_.isObject(args.btns)) btn.applyProperties(args.btns);
      else btn.title = args.btns;

      btn.addEventListener('click', function(){
        hide();
        var btnReturns = null;
        args.picker && (btnReturns = $.picker.selectedItem());
        $.args.input && (btnReturns = $.inputField.getValue());

        args.callback && args.callback(btnReturns);
      });

      $.viewBtns.add(btn);
    }
  }

  $.DHalertMask.show();

  if(args.picker){
    $.picker.scrollDown();
  }
}

/*
@ hide
*/
function hide(){
  $.DHalertMask.hide();
  cleanUp();
}

/*
@ fixFocus
*/
function fixFocus(event){
  if(OS_IOS){
    event.source.removeEventListener('focus', fixFocus);
    event.source.addEventListener('focus', focusInput);
    event.source.addEventListener('blur', blurInput);
    return;
  }

  event.source.removeEventListener('focus', fixFocus);
  event.source.blur();
}
if($.args.input){
  $.inputField.fireEvent('focus');
  $.DHalertMask.addEventListener('click', function(){
    if(OS_IOS && inputUp){
      $.inputField.blur();
      inputUp = false;
    }
  });
}

/*
@ focusInput
*/
function focusInput(event){
  if(OS_IOS) setTimeout(function(){ inputUp = true; }, 500);
}

/*
@ blurInput
*/
function blurInput(event){
  inputUp = false;
}

/*
@ $.exports
*/
exports.show = show;
exports.hide = hide;
exports.setUp = function(){
  var args = arguments[0] || {};

  // image
  if(args.image){
    $.image.backgroundImage = args.image;
    $.image.height= 71;

  }else if($.image){
    $.image.backgroundImage = '';
    $.image.height= 0;
  }

  // Picker
  if(args.picker) $.picker.populatePicker(args.picker);
  if(args.pickerHeight) $.picker.setPickerHeight(args.pickerHeight);

  if(args.inputHint) $.inputField.hintText = args.inputHint;
};
