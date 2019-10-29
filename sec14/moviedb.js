movies = [
  {
    title: "Harry Potter",
    rating: 4,
    hasWatched: true
  },
  {
    title: "Shape of The Water",
    rating: 3,
    hasWatched: true
  },
  {
    title: "Whiplash",
    rating: 5,
    hasWatched: true
  },
  {
    title: "Name of the Wind",
    rating: 10,
    hasWatched: false
  }  
]

movies.forEach(m => {
  console.log(buildString(m));
})

function buildString(movie) {
  let res = ""
  if (movie.hasWatched) {
    res += "You have watched ";
  } else {
    res += "You have not seen ";
  }
  res += "\"" + movie.title + "\" - " + movie.rating + " stars"
  return res;
}