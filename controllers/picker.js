/*
@
*/
var selectedRow = null;

/*
@ touchItem
*/
function touchItem(event){
  var item = $.section.getItemAt(event.itemIndex)
    , itemData = JSON.parse(item.properties.data)
    ;

  selectedRow = itemData;

  $.section.getItems().forEach(function(current, index){
    var currItem = $.section.getItemAt(index);

    if(event.itemIndex == index){
      currItem.toggle.visible = true;
      currItem.title.color = currItem.title.selectedColor;

    }else{
      currItem.toggle.visible = false;
      currItem.title.color = currItem.title.unSelectedColor;
    }
    $.section.updateItemAt(index, currItem);
  });
}


/*
@ populatePicker
*/
exports.populatePicker = function(data){
  var json = data
    , tempItem = []
    ;

  json.forEach(function(item, index){
    if(index === 0 ) selectedRow = item.data;
    tempItem.push({
      properties:{
        data: JSON.stringify(item.data)
      },

      template: item.style ? item.style : 'oneValue',
      toggle: { visible: false },

      title: item.title,
      title2: item.title2 ? item.title2 : null,
    });
  });

  $.section.setItems(tempItem);


  var currItem = $.section.getItemAt(0);
  currItem.toggle.visible = true;
  currItem.title.color = currItem.title.selectedColor;
  $.section.updateItemAt(0, currItem);
};

/*
@ show
*/
exports.show = function(){
  $.DHpicker.show();
};

/*
@ selectedItem
*/
exports.selectedItem = function(){
  console.log('- - - - - - - -');
  console.log('selectedItem: ', JSON.stringify(selectedRow));
  console.log('- - - - - - - -');
  return selectedRow;
};

/*
@ setPickerHeight
*/
exports.setPickerHeight = function(number){
  $.DHpicker.height = number;
};

/*
@ scrollToItem
*/
exports.scrollDown = function(){
  var index = $.section.getItems().length;

  for(var i = 0; i < index; i++){
    (function IIFE(curr){
      _.delay(function(){
        $.DHpicker.scrollToItem(0, curr, true);
      }, 150 * curr);
    })(i);
  }

  setTimeout(function(){
    $.DHpicker.scrollToItem(0, 0, true);
  }, index * 150 + 500);
};
