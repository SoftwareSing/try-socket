function main () {
  const input = document.getElementById('input-message')
  input.addEventListener('keyup', function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      document.getElementById('send-btn').click()
    }
  })
}

main()
