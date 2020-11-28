// Create key and add sound
let drumpad = document.querySelector(".drumpad");
fetch("./keyData.json")
	.then((res) => res.json())
	.then((res) => (data = res))
	.then((res) =>
		res.map((x) => {
			drumpad.innerHTML += `<li class="key" data-key="${x.key}"><audio src="assets/media/${x.url}" data-key="${x.key}"></audio></li>`;
		})
	);

function removeTransition(e) {
	console.log(e);
	if (e.propertyName !== "background-color") return;
	this.classList.remove("playing");
}

function playSound(e) {
	const audio = document.querySelector(`audio[data-key=${e.code}]`);
	const key = document.querySelector(`.key[data-key=${e.code}]`);
	if (!audio) return;
	audio.currentTime = 0;
	audio.play();
	key.classList.add("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playSound);

window.addEventListener("click", function (e) {
	const audio = document.querySelector(
		`audio[data-key=${e.path[0].getAttribute("data-key")}]`
	);
	if (!audio) return;
	audio.currentTime = 0;
	audio.play();
});
