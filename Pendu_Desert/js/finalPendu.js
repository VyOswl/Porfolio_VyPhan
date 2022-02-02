$(document).ready(function () {
	// Déclarer les parametres
	let
		alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
		listeMots = ["serpent", "sec", "mauvaise terre"],
		leMot = "",
		motTrouver = [],
		motEssaye = "",
		nbFaux = 0,
		perdu = false,
		canvas = document.getElementById('canvas'),
		imgCompt = 0,
		imgInterval = null,
		spaceDance = new Image(),
		spaceMusic = new Audio(),
		ctx = canvas.getContext("2d"),
		$img = $('#hang-img'); // Astronaute

	spaceDance.src = "media/spaceDance.png";
	spaceMusic.src = "media/spaceMusic.mp3";


	// Créer les buttons d'alphabet
	for (let i = 0; i < alphabet.length; i++) {
		$('<button/>', {
			text: alphabet[i],
			id: 'btn_' + alphabet[i],
			width: "40px",
			click: function (event) {
				verifRep(event, false);
			}
		}).appendTo("#btnAlphabet");
	}


	function deactivBtn() {
		$("#btnAlphabet button").attr("disabled", "disabled");
	}
	deactivBtn();

	function activBtn() {
		$("#btnAlphabet button").removeAttr("disabled");
	}


	function lancerJeu() {
		creerLeMot();
		affichageCanvas();
		activBtn();
	}
	lancerJeu();

	function creerLeMot() {
		motTrouver = new Array();
		let randomMot = Math.floor(Math.random() * listeMots.length);
		leMot = listeMots[randomMot];
		if (leMot.length < 3 || leMot.length > 13) {
			creerLeMot();
		}
		console.log(leMot);
		for (let i = 0; i < leMot.length; i++) {
			if (leMot[i] == "-") {
				motTrouver[i] = "-";
			}
			else if (leMot[i] == " ") {
				motTrouver[i] = " ";
			} else {
				motTrouver[i] = " _";
			}
		}
		motEssaye = motTrouver.join("");
	}


	function defPointGagne() {
		if (!localStorage.pointGagne) {
			localStorage.pointGagne = 0;
		}
	}
	defPointGagne();

	function updtPointGagne() {
		localStorage.pointGagne = +(localStorage.pointGagne) + 1;
	}

	function recPointGagne() {
		if (localStorage.pointGagne) {
			return localStorage.pointGagne;
		}
	}

	function defPointPerdu() {
		if (!localStorage.pointPerdu) {
			localStorage.pointPerdu = 0;
		}
	}
	defPointPerdu();

	function updtPointPerdu() {
		localStorage.pointPerdu = +(localStorage.pointPerdu) + 1;
	}

	function recPointPerdu() {
		if (localStorage.pointPerdu) {
			return localStorage.pointPerdu;
		}
	}


	// La logique du jeu
	function verifRep(event, isKeyPress) {
		let currentButton;
		let leLettre;
		let correct = false;
		currentButton = $(event.target);
		$(currentButton).attr("disabled", "disabled");
		leLettre = $(currentButton).text().toLowerCase();

		for (let i = 0; i < leMot.length; i++) {
			if (leMot.charAt(i) == leLettre) {
				motTrouver[i] = leLettre;
				correct = true;
			}
		}
		motEssaye = motTrouver.join("");

		if (!correct) {
			nbFaux++
		}
		if (motEssaye == leMot) {
			deactivBtn();
			setTimeout(siGagne, 1000);
		}
		if (nbFaux == 6) {
			perdu = true;
		}
		affichageCanvas();
	}


	function affichageCanvas() {
		effacerCanvas(ctx, canvas);

		for (let i = 0; i <= nbFaux; i++) {
			dessinePendu(i);
			$img.attr('src', 'media/img' + i + '.png')
		}

		if (perdu) {
			deactivBtn();
			annonce("Tu as perdu!", 90, 200, "bold 50px monospace", "#5271FF");
			annonce(leMot, 50, 27, "bold 35px monospace", "black");
			updtPointPerdu();
			setTimeout(jeuTermine, 3000);
		} else {
			annonce(motEssaye, 50, 27, "bold 35px monospace", "black");
		}
		annonce("Tu as trouvé " + recPointGagne() + " mots.", 120, 350, "bold 20px monospace", "black");
		annonce("Tu n'as pas trouvé " + recPointPerdu() + " mots.", 120, 380, "bold 20px monospace", "black");
	}


	function effacerCanvas(context, canvas) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		let w = canvas.width;
		canvas.width = 1;
		canvas.width = w;
	}


	function stick() {
		ctx.moveTo(120, 305);
		ctx.lineTo(280, 305);
		ctx.moveTo(260, 305);
		ctx.lineTo(260, 70);
		ctx.lineTo(180, 70);
		ctx.lineTo(180, 110);
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
	function tete() {
		ctx.beginPath();
		ctx.arc(180, 132, 23, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
	function corps() {
		ctx.moveTo(180, 153);
		ctx.lineTo(180, 230);
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
	function bras1() {
		ctx.moveTo(180, 175);
		ctx.lineTo(142, 167);
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
	function bras2() {
		ctx.moveTo(180, 175);
		ctx.lineTo(218, 167);
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
	function jambe1() {
		ctx.moveTo(180, 230);
		ctx.lineTo(145, 270);
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
	function jambe2() {
		ctx.moveTo(180, 230);
		ctx.lineTo(215, 270);
		ctx.strokeStyle = "black";
		ctx.stroke();
	}

	function dessinePendu(numPart) {
		switch (numPart) {
			case 0:
				stick();
				break;
			case 1:
				tete();
				break;
			case 2:
				corps();
				break;
			case 3:
				bras1();
				break;
			case 4:
				bras2();
				break;
			case 5:
				jambe1();
				break;
			case 6:
				jambe2();
				break;
		}
	}


	function siGagne() {
		imgCompt = 0;
		spaceMusic.currentTime = 0;
		updtPointGagne();
		imgInterval = setInterval(afficherSiGagne, 120);
	}


	function redemarrer() {
		spaceMusic.pause();
		jeuTermine();
	}


	function jeuTermine() {
		nbFaux = 0;
		perdu = false;
		lancerJeu();
	}


	function afficherSiGagne() {
		effacerCanvas(ctx, canvas);
		if (imgCompt >= 85) {
			clearInterval(imgInterval);
			setTimeout(redemarrer, 1000);
		}
		ctx.drawImage(spaceDance, 164 * imgCompt, 0, 164, 264, 136, 58, 164, 264);
		annonce("Tu as gagné!!", 90, 375, "bold 50px monospace", "#8C52FF");
		imgCompt++;
		spaceMusic.play();
	}


	function annonce(word, textX, textY, font, color) {
		ctx.font = font;
		ctx.fillStyle = color
		ctx.fillText(word, textX, textY);
	}


	// Button Continuer
	document.getElementById('next').onclick = function () {
		clearInterval(imgInterval);
		redemarrer();
	}

	// Button Rejouer
	document.getElementById('reset').onclick = function () {
		clearInterval(imgInterval);
		localStorage.clear();
		defPointGagne();
		defPointPerdu();
		redemarrer();
	}

});