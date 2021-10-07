console.log("App.js");
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let title = document.getElementById("title");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let myObj = {
    title : title.value,
    text : addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  addTxt.value = "";
  title.value = "";
  console.log(notesObj);
  showNotes();
});
function showNotes() 
{
    let notes = localStorage.getItem("notes");

    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index) 
    {
        
    
        html += `
            <div class="noteCard my-2 mx-2" style="width: 18rem;">
                <!-- <img src="..." class="card-img-top" alt="..."> -->
                <div class="card-body">
                        <h5 class="card-title">Note: ${element.title} </h5>
                        <p class="card-text">${element.text}</p>
                        <button id=${index} onClick="deletNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
            `;
    });
    let noteElm = document.getElementById('notes');
    if(notesObj.length != 0)
    {
        noteElm.innerHTML = html; 
    }
    else{
        noteElm.innerHTML = `Nothing to Show!!! use "Add a Note" Section to Add Notes`;
    }
}
function deletNote(index)
{
    console.log('Deleted Node :', index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
      } else {
        notesObj = JSON.parse(notes);
      }
      notesObj.splice(index,1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();

}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})