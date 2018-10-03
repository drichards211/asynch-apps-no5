// This is a bare-bones app. Zero frills.

function listenFormInput() {
  $('form').submit(event => {
    event.preventDefault();
    const userHandle = $("#form-input").val();
    getUserReps(userHandle)
  });
}

function getUserReps(userHandle) {
  fetch(`https://api.github.com/users/${userHandle}/repos`)
    .then(response => response.json())
    .then(responseJson => renderUserReps(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function renderUserReps(responseJson) {
  console.log(responseJson)
  if (responseJson.message === "Not Found") {
    alert("User handle not available, please select another")
  } else {
  $('#results-list').empty()
  // Using array.map() to make my mentor happy... Hi Luis! ;)
  responseJson.map(element => {
    $('#results-list').append(`<li><h3><a href="${element.html_url}" target="_blank">${element.full_name}</a></h3>`)
  })
  // A 'for' loop also works:
  /* for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(`<li><h3><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].full_name}</a></h3>`)
  } */
  $('.repo-container').removeClass('hidden');
  }
}    

$(listenFormInput)