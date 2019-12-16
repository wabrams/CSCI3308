function openModal() {
    var myInput = document.getElementById("passwordd");
	var length = document.getElementById("length");
	myInput.onkeyup = function() {
       console.log('helllooo')
        var minLength = 5; // : Change the minimum length to what what it needs to be in the question
        // Validate length
        if(myInput.value.length >= minLength) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
        enableButton(length);
    }
}
function enableButton(length) {
    var button = document.getElementById('my_submit_button');
    var condition = (length.classList.contains("valid")); // TODO: Replace false with the correct condition
    if(condition) {
            button.disabled = false;
        }
    else {
        button.disabled = true;
    }
    }
