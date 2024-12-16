// Function to load data from localStorage
function loadData() {
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : []; // Parse data if available, else return an empty array
  }
  
  // Function to save data to localStorage
  function saveData() {
    localStorage.setItem('data', JSON.stringify(data)); // Store the array as a string
  }
  
  // Array to store data (loaded from localStorage)
  let data = loadData();
  let currentIndex = null; // To keep track of which item we are updating
  
  // Function to render the data list
  function renderList() {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = ''; // Clear the list
  
    data.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.firstName} ${item.lastName} (${item.gmail}) `;
  
      // Create "Update" button
      const updateBtn = document.createElement('button');
      updateBtn.textContent = 'Update';
      updateBtn.className = 'update';
      updateBtn.onclick = () => showUpdateForm(index);
      li.appendChild(updateBtn);
  
      // Create "Delete" button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete';
      deleteBtn.onclick = () => deleteData(index);
      li.appendChild(deleteBtn);
  
      dataList.appendChild(li);
    });
  }
  
  // Create operation
  function createData() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const gmail = document.getElementById('gmail').value;
    const password = document.getElementById('password').value;

    // Validation to make sure fields are not empty
    if (firstName && lastName && gmail && password) {
      // Save data to localStorage
      let data = JSON.parse(localStorage.getItem('data')) || []; // Fetch existing data or start with empty array
      const newData = { firstName, lastName, gmail, password };
      data.push(newData);
      localStorage.setItem('data', JSON.stringify(data));

      // Clear input fields
      document.getElementById('firstName').value = '';
      document.getElementById('lastName').value = '';
      document.getElementById('gmail').value = '';
      document.getElementById('password').value = '';

      // Redirect to 'crud.html'
      window.location.href = 'crud.html'; // This redirects the user to 'crud.html'
    } else {
      alert('Please fill out all fields.');
    }
  }
  
  // Show update form with pre-filled data
  function showUpdateForm(index) {
    const item = data[index];
    document.getElementById('updateFirstName').value = item.firstName;
    document.getElementById('updateLastName').value = item.lastName;
    document.getElementById('updateGmail').value = item.gmail;
    document.getElementById('updatePassword').value = item.password;
  
    // Show the update form and hide the main input
    document.getElementById('updateForm').style.display = 'block';
    currentIndex = index;
  }
  
  // Save the updated data
  function saveUpdatedData() {
    const updatedFirstName = document.getElementById('updateFirstName').value;
    const updatedLastName = document.getElementById('updateLastName').value;
    const updatedGmail = document.getElementById('updateGmail').value;
    const updatedPassword = document.getElementById('updatePassword').value;
  
    if (updatedFirstName && updatedLastName && updatedGmail && updatedPassword) {
      data[currentIndex] = { firstName: updatedFirstName, lastName: updatedLastName, gmail: updatedGmail, password: updatedPassword };
      saveData(); // Save the updated data to localStorage
      renderList(); // Re-render the list
      cancelUpdate(); // Hide the update form
    } else {
      alert('Please fill out all fields.');
    }
  }
  
  // Cancel the update and hide the form
  function cancelUpdate() {
    document.getElementById('updateForm').style.display = 'none';
  }
  
  // Delete operation
  function deleteData(index) {
    if (confirm('Are you sure you want to delete this item?')) {
      data.splice(index, 1); // Remove the item from the array
      saveData(); // Save the updated data to localStorage
      renderList(); // Re-render the list
    }
  }
  
  // Initial render of the list
  renderList();
  