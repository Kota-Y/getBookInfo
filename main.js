function setBookInfo(){

  sheet = SpreadsheetApp.getActiveSheet();
  insertRow = sheet.getActiveCell().getRow();
  isbn = sheet.getActiveCell().getValue();
  
  var isbnLen = isbn.toString().length;
  if(isbnLen != 13 && isbnLen != 0){
    Browser.msgBox("ISBNは13桁で入力してください。\\n現在は" + isbnLen + "桁です。")
    exit();
  }
 
  response = UrlFetchApp.fetch('https://api.openbd.jp/v1/get?isbn=' + isbn);
  data = JSON.parse(response.getContentText());
    
  // title取得
  try{
    title = data[0].summary.title;
    sheet.getRange(insertRow, 2).setValue(title);
  }
  catch(e){
    //Logger.log(e);
  }
  
  // author1st取得
  try{
    author1st = data[0].onix.DescriptiveDetail.Contributor[0].PersonName.content;
    sheet.getRange(insertRow, 3).setValue(author1st);
  }
  catch(e){
    //Logger.log(e);
  }
  
  // author2nd取得
  try{
    author2nd = data[0].onix.DescriptiveDetail.Contributor[1].PersonName.content;
    sheet.getRange(insertRow, 4).setValue(author2nd);
  }
  catch(e){
    //Logger.log(e);
  }
  
  // author3rd取得
  try{
    author3rd = data[0].onix.DescriptiveDetail.Contributor[2].PersonName.content;
    sheet.getRange(insertRow, 5).setValue(author3rd);
  }
  catch(e){
    //Logger.log(e);
  }

  // price取得
  try{
    price = data[0].onix.ProductSupply.SupplyDetail.Price[0].PriceAmount;
    sheet.getRange(insertRow, 6).setValue(price);
  }
  catch(e){
    //Logger.log(e);
  }
}

function onEdit(e){
  if(e.range.getColumn() == 1) {
      setBookInfo();
  }
}
