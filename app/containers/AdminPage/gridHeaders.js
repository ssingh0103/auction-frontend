const columnDefs= [
  {
    headerName: "Identifier", field: "id"
  },
  {
    headerName: "Title", field: "title"
  }, {
    headerName: "Highest Bid", field: "hb"
  }, {
    headerName: "H. Bidder Email", field: "hbe"
  },
  {
    headerName: "H. Bidder Name", field: "hbn"
  },


];   
const sc =[{
  headerName: "Make", field: "make"
}, {
  headerName: "Model", field: "model"
}, {
  headerName: "Price", field: "price"
}]

const sd =[{
  make: "Toyota", model: "Celica", price: 35000
}, {
  make: "Ford", model: "Mondeo", price: 32000
}, {
  make: "Porsche", model: "Boxter", price: 72000
}]
  export {
      columnDefs,
      sc,sd
  }