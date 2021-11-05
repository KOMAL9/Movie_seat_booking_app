
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
//only select the seats in the row div , which are not occupied
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieselected = document.getElementById('movie');

//local storage : to make data persist across page refresh

//3 items are being set in local storage : selectedmovieindiex,selectedmovieprice,selectedseats(list)
//data in a local storage variable is set as a string , not as a array .

populateUI();  /*  runs on page load/reload  */

let ticketPrice = +movieselected.value;



// Save selected movie index(one among 0,1,2,3) and price
function setMovieData(movieIndex, moviePrice)
 {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}




// Update total and count on the screen
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');




  /* to save a specific set of seat(to be able to differentiate between them) into a local storage --> */
  /*copy selected seats into arr , map through array , return a  new array of indexes */

   /* spread operator also converts a nodelist into a regular array */
  const seatsIndex = [...selectedSeats].map(seat =>
     [...seats].indexOf(seat));
     console.log(seatsIndex);


/* seatsIndex will contain a list of indexes of selected seats by user */

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));





  const selectedSeatsCount = selectedSeats.length;
/* will contain the number of seats selected*/

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

}


// Get data(3 things stored in local storage) from localstorage and populate the UI with that data . 
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  console.log(selectedSeats);

  if (selectedSeats !== null && selectedSeats.length > 0) 
  {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
 


  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieselected.selectedIndex = selectedMovieIndex;
  }
}




///EVENT LISTENERS



// Movie select event - when the movie is changed
movieselected.addEventListener('change', e => {
  ticketPrice = +e.target.value; // sets the ticket price.
  setMovieData(e.target.selectedIndex, e.target.value); //to make data persist across page refresh
  updateSelectedCount();
});
 



// Seat click event - when seats are selected
container.addEventListener('click', e => {
  if ( e.target.classList.contains('seat') &&  !e.target.classList.contains('occupied') ) 

  {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
  
});





// Initial count and total set on page load from the data present in local storage
updateSelectedCount();
