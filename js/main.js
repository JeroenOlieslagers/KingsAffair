// Set the date we're counting down to
var countDownDate = new Date("Feb 27, 2019 19:30:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("timer").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "LAUNCH PARTY";
    }
}, 1000);

$('.ml12').each(function () {
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});
ml.timelines["ml12"] = anime.timeline({ loop: true })
  .add({
      targets: '.ml12 .letter',
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 12000,
      delay: function (el, i) {
          return 500 + 30 * i;
      }
  }).add({
      targets: '.ml12 .letter',
      translateX: [0, -30],
      opacity: [1, 0],
      easing: "easeInExpo",
      duration: 1100,
      delay: function (el, i) {
          return 100 + 30 * i;
      }
  });