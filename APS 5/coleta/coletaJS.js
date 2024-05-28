function initMap() {
    
    var center = new google.maps.LatLng(-23.659337394865794, -46.7392937114376);
    var la_bella_cucina = new google.maps.LatLng(-23.630273432589547, -46.741432155704175);
    var sabores_do_dragao = new google.maps.LatLng(-23.662891595116673, -46.76068105497625);
    var tacos_dos_hermanos = new google.maps.LatLng(-23.659337394865794, -46.7392937114376);
    var cantinho_mineiro = new google.maps.LatLng(-23.654600328089217, -46.69592617919402);
    var bistro_vila_santiago = new google.maps.LatLng(-23.660257188370007, -46.77454257228318);

    var mapOptions = {
        zoom: 13,
        center: center
    };

    var infoWindow = new google.maps.InfoWindow();

    var map = new google.maps.Map(document.getElementById('mapa-coleta'), mapOptions);

    var request;
    
    function calcularRota() {
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();
        var map = new google.maps.Map(document.getElementById('mapa-coleta'), {
            zoom: 7,
            center: { lat: -23.5489, lng: -46.6388 }
        });
        directionsRenderer.setMap(map);
        habilitarWaypoints()

        
        request = {
            origin: bistro_vila_santiago,
            destination: bistro_vila_santiago,
            waypoints: [],
            travelMode: 'DRIVING',
            optimizeWaypoints: true,
            language: 'pt-BR'
        };


        directionsService.route(request, function(response, status) {
            if (status == 'OK') {
                directionsRenderer.setDirections(response);
            } else {
                window.alert('Não foi possível calcular a rota: ' + status);
            }
        });

    }

    function obterCoordenadasRestaurante(restaurante) {
        var coordenadasRestaurantes = {
            "La Bella Cucina": la_bella_cucina,
            "Sabores do Dragão": sabores_do_dragao,
            "Cantinho Mineiro": tacos_dos_hermanos,
            "Tacos dos Hermanos": cantinho_mineiro,
            "Bistrô Vila Santiago": bistro_vila_santiago
        };
    
        if (restaurante in coordenadasRestaurantes) {
            return coordenadasRestaurantes[restaurante];
        } else {
            return null;
        }
    }

    function habilitarWaypoints() {
        return new Promise((resolve, reject) => {
            fetch("../resultados.json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(resultados => {
                    resultados.forEach(resultado => {
                        if (resultado.porcentagem_consumo >= 60) {
                            request.waypoints.push({ location: obterCoordenadasRestaurante(resultado.restaurante), stopover: true });
                        }
                    });
                    resolve();
                })
                .catch(error => reject(error));
        });
    }

    calcularRota()

    infoWindow.open(map);
    
}