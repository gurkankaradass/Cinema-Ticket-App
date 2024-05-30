class Storagex{
    static keySelectedSeats = "keySelectedSeats";
    static keyFullSeats = "keyFullSeats";
    static keySelectedMovie = "keySelectedMovie";

    static getSelectedSeatsFromStorage(){
        let selectedSeats;
        if(localStorage.getItem(this.keySelectedSeats)===null){
            selectedSeats = [];
        }
        else{
            selectedSeats = JSON.parse(localStorage.getItem(this.keySelectedSeats));
        }
        return selectedSeats;
    }

    static getFullSeatsFromStorage(){
        let fullSeats;
        if(localStorage.getItem(this.keyFullSeats)===null){
            fullSeats = [];
        }
        else{
            fullSeats = JSON.parse(localStorage.getItem(this.keyFullSeats));
        }
        return fullSeats;
    }

    static getSelectedMovieIndexFromStroge(){
        return localStorage.getItem(this.keySelectedMovie);
    }

    static addSelectedToStorage(indexs){
        localStorage.setItem(this.keySelectedSeats, JSON.stringify(indexs));
    }

    static addFullToStorage(indexs){
        const fullSeatsIndex = this.getFullSeatsFromStorage();
        indexs.forEach(index => fullSeatsIndex.push(index));
        localStorage.setItem(this.keyFullSeats, JSON.stringify(fullSeatsIndex));
    }

    static addSelectedMovieToStorage(indexs){
        localStorage.setItem(this.keySelectedMovie , JSON.stringify(indexs));
    }


}