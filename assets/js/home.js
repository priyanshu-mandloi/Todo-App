function getDropdownContent() {
  var selectElement = document.getElementById("select");
  var options = selectElement.options;
  // console.log("GET All the option",options);
  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    if (options[i].value === "Personal") {
      console.log(options[i].value);
      p.style.border = "border: 2px solid black";
    }
  }
}

function handleDelete() {
  const checkedItems = document.querySelectorAll(".delechack:checked");
  const checkedIds = Array.from(checkedItems).map((item) =>
    item.getAttribute("uid")
  );
  if (checkedIds.length === 0) {
    swal("No item is checked!", "Please select items to remove.", "error");
    return;
  }

  // Send the AJAX request to delete the items
  $.ajax({
    type: "POST",
    url: "/delete-list",
    data: { ids: checkedIds },
    success: function () {
      swal("Items deleted!", "Click OK to go back home.", "success").then(
        () => {
          window.location = "/";
        }
      );
    },
    error: function (err) {
      console.log(err);
    },
  });
}

// Attach the handleDelete function to the delete button click event
document.getElementById("deleteButton").addEventListener("click", handleDelete);
