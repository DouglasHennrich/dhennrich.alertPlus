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

  $.trigger('selectedItem', itemData);
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

  json.forEach(function(item){
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
  return selectedRow;
};

/*
@ setPickerHeight
*/
exports.setPickerHeight = function(number){
  $.DHpicker.height = number;
};
