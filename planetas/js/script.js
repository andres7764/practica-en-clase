window.onload = function()
{
	var array = [];
	var ancho = window.innerWidth;
	var alto = window.innerHeight;
	var lienzo = new THREE.WebGLRenderer({alpha: true});
	var planetas = ["mercurio","venus","tierra","marte"];
	lienzo.setSize(ancho, alto);
	document.body.appendChild(lienzo.domElement);
	var escena 		  = new THREE.Scene,
		tamanoJupiter = 300;

	var planetas = [{planeta: "jupiter", tamano: tamanoJupiter, imagen: 'img/jupiter.jpg'},
					{planeta: "marte",   tamano: Math.floor((6794 / 142984) * 100), imagen: "img/marte.jpg"},
					{planeta: "tierra",  tamano: Math.floor((12756 / 142984) * 100), imagen: "img/tierra.jpg"},
					{planeta: "venus",   tamano: Math.floor((12104 / 142984) * 100), imagen:"img/venus.jpg"},
					{planeta: "mercurio",tamano: Math.floor((4880 / 142984) * 100), imagen:"img/mercurio.jpg"}];

	
	var crearPlaneta = function(data)
	{
		var geometria = new THREE.SphereGeometry(data.tamano,data.tamano,data.tamano);
		var textura = THREE.ImageUtils.loadTexture(data.imagen);
		var material = new THREE.MeshBasicMaterial( { map: textura } );
		return new THREE.Mesh(geometria, material);
	};

	for(var i = 0; i < planetas.length; i++) {
				var planeta = crearPlaneta({
							tamano 	: planetas[i].tamano + 10,
							imagen	: planetas[i].imagen
			    })
				escalaJupiter = true;
				escena.add(planeta);
				array.push(planeta);				
	}

	var camara = new THREE.PerspectiveCamera(50,(ancho / alto),0.1, 10000);
	camara.position.y = 160;
	camara.position.z = 400;
	camara.lookAt(planeta.position);
	var cons = 0;
	array[0].position.x = 500;
	array[1].position.x = 70;
	array[2].position.x = -120;
	array[3].position.x = -300;
	array[4].position.x = -400;

	escena.add(camara);
	
	function renderizar()
	{
		for(var i = 0; i < planetas.length; i++) {
			array[i].rotation.y += 0.001;
		}
			lienzo.render(escena, camara);
			requestAnimationFrame(renderizar);
	}
	renderizar();
};
