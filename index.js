const submitButton = document.querySelector(".submit-button");

const commentUsername = document.querySelector("#comment-username");
const commentDate = document.querySelector("#comment-date");
const commentText = document.querySelector("#comment-text");
const validErrors = document.querySelectorAll(".validation-error");

const commentsHeader = document.querySelector(".main-comments-header>h3");
const commentsBlock = document.querySelector(".main-comments-items");

let comment = {
	date: `${
		new Date().getMonth() + 1 < 10
			? "0" + +(new Date().getMonth() + 1)
			: new Date().getMonth() + 1
	}.${
		new Date().getDate() < 10
			? "0" + new Date().getDate()
			: new Date().getDate()
	}.${new Date().getFullYear()}`,
};

commentsHeader.textContent = `Количество комментариев: ${commentsBlock.children.length}`;

commentsBlock.addEventListener("click", (event) => {
	if(event.target.tagName == "BUTTON") {
		commentsBlock.removeChild(event.target.parentElement);
		commentsHeader.textContent = `Количество комментариев: ${commentsBlock.children.length}`;
	} else if(event.target.tagName == "P" && event.target.textContent == "Лайк") {
		event.target.classList.toggle("green-white");
	}
});

commentUsername.addEventListener("focus", (event) => {
	validErrors[0].style.display = "none";
});

commentUsername.addEventListener("change", (event) => {
	const usernameValidation = event.target.value.match(
		new RegExp(/[a-zA-Z0-9]{1,}/)
	);
	if (
		event.target.value.length == 0 ||
    usernameValidation.length > 1 ||
    !usernameValidation ||
    usernameValidation[0] < usernameValidation.input
	) {
		validErrors[0].style.display = "block";
	}
	comment.username = usernameValidation[0];
});

commentText.addEventListener("focus", (event) => {
	validErrors[1].style.display = "none";
});

commentText.addEventListener("change", (event) => {
	const textValidation = event.target.value.match(
		new RegExp(/[ а-яА-Яa-zA-Z0-9.,?!=+-/*@#$^:;'"]{1,}/g)
	);
	if (
		event.target.value.length == 0 ||
    textValidation.length > 1 ||
    !textValidation ||
    textValidation[0] < textValidation.input
	) {
		validErrors[1].style.display = "block";
	}
	comment.text = textValidation[0];
});

commentDate.addEventListener("focus", (event) => {
	validErrors[2].style.display = "none";
});

commentDate.addEventListener("change", (event) => {
	const dateValidation = event.target.value.match(
		new RegExp(/[01]{1}[0-9]{1}.[0123]{1}[0-9]{1}.[0-9]{4}/)
	);
	if (
		!dateValidation ||
    dateValidation.length > 1 ||
    dateValidation[0] < dateValidation.input
	) {
		validErrors[2].style.display = "block";
	} else {
		if (new Date(dateValidation[0]) == "Invalid Date") {
			validErrors[2].style.display = "block";
			validErrors[2].textContent = "Неверный формат даты, нужен ММ.ДД.ГГГГ";
		}
	}
	if (event.target.value) comment.date = dateValidation[0];
});

submitButton.addEventListener("click", (event) => {
	event.preventDefault();
	if (
		comment.username &&
    comment.text &&
    comment.date &&
    validErrors[0].style.display == "none" &&
    validErrors[1].style.display == "none" &&
    (validErrors[2].style.display == "none" ||
      validErrors[2].style.display == "")
	) {
		const newComment = document.createElement("div");
		newComment.classList.add("main-comments-item");

		const newUsername = document.createElement("p");
		newUsername.classList.add("comments-item-username");
		newUsername.textContent = comment.username;

		const newText = document.createElement("p");
		newText.classList.add("comments-item-text");
		newText.textContent = comment.text;

		const newDate = document.createElement("p");
		newDate.classList.add("comments-item-date");
		newDate.textContent = `${comment.date} ${new Date().getHours()}:${
			new Date().getMinutes() < 10
				? "0" + new Date().getMinutes()
				: new Date().getMinutes()
		}${
			new Date() - new Date(comment.date) >= 60000 &&
      new Date() - new Date(comment.date) < 172800000 &&
      new Date().getDate() != new Date(comment.date).getDate()
				? ", вчера"
				: new Date() - new Date(comment.date) < 86400000 &&
          new Date().getDate() == new Date(comment.date).getDate()
					? ", сегодня"
					: ""
		}`;

		const newDeleteButton = document.createElement("button");
		newDeleteButton.classList.add("delete-button");
		newDeleteButton.textContent = "Удалить";

		const newLike = document.createElement("p");
		newLike.classList.add("like");
		newLike.textContent = "Лайк";

		newComment.appendChild(newUsername);
		newComment.appendChild(newText);
		newComment.appendChild(newDate);
		newComment.appendChild(newDeleteButton);
		newComment.appendChild(newLike);
		commentsBlock.appendChild(newComment);
		commentsHeader.textContent = `Количество комментариев: ${commentsBlock.children.length}`;
		comment = {
			date: `${
				new Date().getMonth() + 1 < 10
					? "0" + +(new Date().getMonth() + 1)
					: new Date().getMonth() + 1
			}.${
				new Date().getDate() < 10
					? "0" + new Date().getDate()
					: new Date().getDate()
			}.${new Date().getFullYear()}`,
		};
		commentUsername.value = "";
		commentText.value = "";
		commentDate.value = "";
	}
});
