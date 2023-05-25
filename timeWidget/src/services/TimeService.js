export const getUserLocation = async () => {
  console.log("entre")
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.latitude, coords.longitude])
      },
      (err) => {
        alert("no se pudo obtener la localizacion")
        console.log(err);
        reject();
      }
    )
  }

  )
}
