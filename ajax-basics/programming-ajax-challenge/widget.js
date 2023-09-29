const xhr2 = new XMLHttpRequest();
xhr2.onreadystatechange = function (){
  if(xhr2.readyState === 4 && xhr2.status === 200) {
    const rooms = JSON.parse(xhr2.responseText);
    let statusHTML2 = '<ul class="rooms">';
    for (let i=0; i<rooms.length; i++){
      if (rooms[i].available === true) {
        statusHTML2 += '<li class="empty">';
      } else {
        statusHTML2 += '<li class="full">';
      }
      statusHTML2 += rooms[i].room;
      statusHTML2 += '</li>';
    }
    statusHTML2 += '</ul>';
    document.getElementById('roomList').innerHTML = statusHTML2;
  }

};
xhr2.open('GET', '../data/rooms.json');
xhr2.send();




var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if(xhr.readyState === 4 && xhr.status === 200) {
    var employees = JSON.parse(xhr.responseText);
    var statusHTML = '<ul class="bulleted">';
    for (var i=0; i<employees.length; i += 1) {
      if (employees[i].inoffice === true) {
        statusHTML += '<li class="in">';
      } else {
        statusHTML += '<li class="out">';
      }
      statusHTML += employees[i].name;
      statusHTML += '</li>';
    }
    statusHTML += '</ul>';
    document.getElementById('employeeList').innerHTML = statusHTML;
  }
};
xhr.open('GET', '../data/employees.json');
xhr.send();
