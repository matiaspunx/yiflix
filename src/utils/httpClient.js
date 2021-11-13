const API = "https://api.themoviedb.org/3";

export function get(path) {
  return fetch(API + path, {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGEzYWNlNzg1ZjIwZmYzY2Y3NzdhNTM4YWQ2OTA5NSIsInN1YiI6IjU2OGM0M2MwOTI1MTQxMTMzNDAyNWE5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o7_4q7HszvVb0dcU2ehn5LqqdeIVvztwsyE-1dh1rjs",
      "Content-Type": "application/json;charset=utf-8"
    }
  }).then(result => result.json())
}