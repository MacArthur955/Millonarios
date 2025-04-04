const container_tag = document.getElementById("container");
const question_tag = document.getElementById("question");
const options_tags = document.getElementsByClassName("option");
const confirm_tag = document.getElementById("confirm");
const message_tag = document.getElementById("message");


let level = 0;
let chosen_tag = null;
let corrent_answer = 0;
let level_money = 0;
let final_money = 0;
let ready = false;


function set_question_tag(text, img_path) {
    question_tag.getElementsByTagName("span")[0].textContent = text;
    const img = question_tag.getElementsByTagName("img")[0];
    if (img_path == null) {
        if (!img.classList.contains("hidden")) {
            img.classList.add("hidden");
        }
    } else {
        if (img.classList.contains("hidden")) {
            img.classList.remove("hidden");
        }
        question_tag.getElementsByTagName("img")[0].src = `images/question_${level}/${img_path}.png`;
    }

}


function set_options(options) {
    for (let i = 0; i < 4; i++) {
        const [text, img_path] = options[i];
        const tag = options_tags[i];
        const span = tag.getElementsByTagName("span")[0];
        const img = tag.getElementsByTagName("img")[0];
        if (text === null) {
            if (!span.classList.contains("hidden")) {
                span.classList.add("hidden");
            }
        } else {
            if (span.classList.contains("hidden")) {
                span.classList.remove("hidden");
            }
            span.textContent = text;
        }
        if (img_path === null) {
            if (!img.classList.contains("hidden")) {
                img.classList.add("hidden");
            }
        } else {
            if (img.classList.contains("hidden")) {
                img.classList.remove("hidden");
            }
            img.src = `images/question_${level}/${img_path}.png`;
        }
    }
}


function render_level() {
    const {question: [question_text, question_img], options, answer, money} = questions[level];
    set_question_tag(question_text, question_img);
    set_options(options);
    corrent_answer = answer;
    level_money = money;
}


container_tag.classList.remove("hidden");
for (let tag of options_tags) {
    tag.addEventListener("click", event => {
        console.log(event.currentTarget);
        if (chosen_tag) {
            chosen_tag.classList.remove("chosen");
            chosen_tag.classList.add("hover");
        }
        chosen_tag = event.currentTarget;
        chosen_tag.classList.remove("hover");
        chosen_tag.classList.add("chosen");
        confirm_tag.classList.remove("blocked");
        confirm_tag.classList.add("unblocked");
    });
}
confirm_tag.addEventListener("click", event => {
    if (event.currentTarget.classList.contains("unblocked")) {
        final_money = level_money;
        if (chosen_tag.id == corrent_answer) {
            message_tag.textContent = `Tienes ${final_money} zł en tu cuenta`;
            message_tag.classList.remove("hidden");
            if (level >= questions.length - 1) {
                message_tag.textContent = `¡Ganaste ${final_money} zł!`;
                return
            }
        } else {
            message_tag.textContent = `Desafortunadamente perdiste, recibes la cantidad ganada de ${final_money} zł`;
            message_tag.classList.remove("hidden");
            return
        }

        event.currentTarget.classList.remove("hover");
        confirm_tag.classList.remove("unblocked");
        confirm_tag.classList.add("blocked");
        chosen_tag.classList.remove("chosen");
        chosen_tag.classList.add("hover");
        chosen_tag = null;
        level++;

        render_level()
        ready = true;
    }
});
message_tag.addEventListener("click", event => {
    if (ready) {
        ready = false;
        message_tag.classList.add("hidden");
    }
})

render_level();