import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://shopping-list-e9203-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputEl = document.getElementById("input-el")
const addBtn = document.getElementById("add-btn")
const listEl = document.getElementById("list-el")


addBtn.addEventListener("click", function() {
  let inputValue = inputEl.value
  push(shoppingListInDB, inputValue)
  cleanInput()
})

onValue(shoppingListInDB, function(snapshot) {
  if (snapshot.exists()) {
    let itemsArr = Object.entries(snapshot.val())
    cleanList()
    for (let i = 0; i < itemsArr.length; i++) {
      let currentItem = itemsArr[i]
      // let currentItemID = currentItem[0]
      // let currentItemValue = currentItem[1]
      renderItem(currentItem)
    }
  } else {
    listEl.innerHTML = `No items here... yet`
  }
})

function renderItem(item) {
  let itemID = item[0]
  let itemValue = item[1]

  const LI = document.createElement("LI")
  LI.textContent = itemValue
  
  LI.addEventListener("click", function() {
    let exactLocationItemInDB = ref(database, `shoppingList/${itemID}`)
    remove(exactLocationItemInDB)
    })

  listEl.append(LI)
}

function cleanInput() {
  inputEl.value = ""
}

function cleanList() {
  listEl.innerHTML = ""
}