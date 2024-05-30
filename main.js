const seatMain = document.querySelector(".seatMain");
const selectMovie = document.querySelector("#selectMovie");
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const seats = Array.from(document.querySelectorAll(".seat"));
const buyButton = document.querySelector("#buyButton");
const clearButton = document.querySelector("#clearButton");



runEventListeners();

function runEventListeners(){
    seatMain.addEventListener("click", select);
    selectMovie.addEventListener("change", change);
    document.addEventListener("DOMContentLoaded", runPageLoaded);
    buyButton.addEventListener("click", buyTicket);
}

function change(){
    calculate();
    saveSelectedMovieIndexToStorage();
}

function runPageLoaded(){
    const selectedSeatsIndex = Storagex.getSelectedSeatsFromStorage();
    const fullSelectedIndex = Storagex.getFullSeatsFromStorage();
    seats.forEach((seat , index) => {
        if(selectedSeatsIndex.includes(index)){
            seat.classList.add("selected");
        }
    });

    seats.forEach((seat , index) => {
        if(fullSelectedIndex.includes(index)){
            seat.classList.add("full");
        }
    });

    selectMovie.selectedIndex = Storagex.getSelectedMovieIndexFromStroge();
    calculate();
}

function buyTicket(){
    if(confirm("Satın almak istiyor musunuz?")){
        const selectedSeats = getSelectedSeats();
        const selectedSeatsIndex = getSelectedSeatsIndex();
        selectedSeats.forEach(seat => {
            seat.classList.remove("selected");
            seat.classList.add("full");
        }); 

        Storagex.addFullToStorage(selectedSeatsIndex);
        Storagex.addSelectedToStorage(getSelectedSeats());
        count.textContent = "0";
        amount.textContent = "0";
    }
}

function select(e){
    const selectedElement = e.target.parentElement;
    if(selectedElement.classList.contains("seat") && !selectedElement.classList.contains(".full")){
        selectedElement.classList.toggle("selected"); //add yerine toggle kullandık Çünkü bastığımızda ekler bir kez daha basarsak kaldırır 
    }
    calculate();
    saveSelectedIndexToStorage();
    saveSelectedMovieIndexToStorage();
}

function getSelectedSeats(){
    const selectedList = [...seatMain.querySelectorAll(".selected")];/*Diziye çevirmek için Array.from yerine bu metodu kullandık*/
    return selectedList;
}

function getSelectedSeatsIndex(){
    const selectedList = getSelectedSeats();
    const selectedSeatsIndex = selectedList.map((seat) =>{
        return seats.indexOf(seat);
    })
    return selectedSeatsIndex;
}

function saveSelectedIndexToStorage(){
    const selectedSeatsIndex = getSelectedSeatsIndex();
    Storagex.addSelectedToStorage(selectedSeatsIndex);
}

function saveSelectedMovieIndexToStorage(){
    const selectedMovieIndex = selectMovie.selectedIndex; // seçili olan filmin index numarasını aldık
    Storagex.addSelectedMovieToStorage(selectedMovieIndex);
}

function calculate(){
    const selectedSeatsCount = getSelectedSeats().length;
    const price = selectMovie.value; /*selectMovie.options[selectMovie.selectedIndex].value; yazılabilirdi*/ 
    count.textContent = selectedSeatsCount;
    amount.textContent = selectedSeatsCount * price;
    
}